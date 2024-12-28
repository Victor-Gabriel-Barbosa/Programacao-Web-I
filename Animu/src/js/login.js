document.addEventListener('DOMContentLoaded', async function () {
  class AuthManager {
    constructor() {
      this.users = this.loadUsers();
      this.loginAttempts = {};
      this.maxAttempts = 3;
      this.lockoutDuration = 15 * 60 * 1000; // 15 minutos em milissegundos
    }

    // Função para hash de senha usando SHA-256
    async hashPassword(password) {
      const encoder = new TextEncoder();
      const data = encoder.encode(password);
      const hash = await crypto.subtle.digest('SHA-256', data);
      return Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    }

    // Validar força da senha
    validatePasswordStrength(password) {
      const minLength = 8;
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumbers = /\d/.test(password);
      const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      const errors = [];
      if (password.length < minLength) errors.push(`Mínimo de ${minLength} caracteres`);
      if (!hasUpperCase) errors.push('Pelo menos uma letra maiúscula');
      if (!hasLowerCase) errors.push('Pelo menos uma letra minúscula');
      if (!hasNumbers) errors.push('Pelo menos um número');
      if (!hasSpecialChars) errors.push('Pelo menos um caractere especial');

      return {
        isValid: errors.length === 0,
        errors: errors
      };
    }

    // Verificar tentativas de login
    checkLoginAttempts(username) {
      const attempts = this.loginAttempts[username];
      if (attempts) {
        if (attempts.count >= this.maxAttempts &&
            Date.now() - attempts.lastAttempt < this.lockoutDuration) {
          const remainingTime = Math.ceil((this.lockoutDuration - (Date.now() - attempts.lastAttempt)) / 1000 / 60);
          throw new Error(`Conta bloqueada. Tente novamente em ${remainingTime} minutos.`);
        }
        if (Date.now() - attempts.lastAttempt >= this.lockoutDuration) {
          delete this.loginAttempts[username];
        }
      }
    }

    // Registrar tentativa de login
    recordLoginAttempt(username, success) {
      if (!this.loginAttempts[username]) {
        this.loginAttempts[username] = { count: 0, lastAttempt: Date.now() };
      }
      if (!success) {
        this.loginAttempts[username].count++;
        this.loginAttempts[username].lastAttempt = Date.now();
      } else {
        delete this.loginAttempts[username];
      }
    }

    // Carregar usuários do localStorage
    loadUsers() {
      return JSON.parse(localStorage.getItem('animuUsers') || '[]');
    }

    // Salvar usuários no localStorage
    saveUsers() {
      localStorage.setItem('animuUsers', JSON.stringify(this.users));
    }

    // Validar registro de usuário
    validateRegistration(username, email, password, confirmPassword) {
      // Validações básicas
      if (username.length < 3) {
        throw new Error('Nome de usuário deve ter pelo menos 3 caracteres.');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Por favor, insira um e-mail válido.');
      }

      if (password.length < 8) {
        throw new Error('A senha deve ter pelo menos 8 caracteres.');
      }

      if (password !== confirmPassword) {
        throw new Error('As senhas não coincidem.');
      }

      // Verificar usuário ou e-mail existente
      const userExists = this.users.some(user =>
        user.username === username || user.email === email
      );

      if (userExists) {
        throw new Error('Usuário ou e-mail já cadastrado!');
      }
    }

    // Registro de usuário
    async registerUser(username, email, password, confirmPassword) {
      try {
        // Validar registro
        this.validateRegistration(username, email, password, confirmPassword);

        // Validar força da senha
        const passwordValidation = this.validatePasswordStrength(password);
        if (!passwordValidation.isValid) {
          throw new Error('Senha fraca. Requisitos:\n' + passwordValidation.errors.join('\n'));
        }

        // Hash da senha
        const hashedPassword = await this.hashPassword(password);

        // Criar novo usuário
        const newUser = {
          id: Date.now().toString(), // ID único
          username,
          email,
          password: hashedPassword, // Em produção, use hash de senha
          isAdmin: false, // Por padrão, usuários não são admin
          createdAt: new Date().toISOString()
        };

        // Adicionar usuário
        this.users.push(newUser);
        this.saveUsers();

        return true;
      } catch (error) {
        this.showError(error.message);
        return false;
      }
    }

    // Salvar credenciais do usuário
    saveCredentials(username, password) {
      const credentials = {
        username: username,
        password: password, // Mantém senha original para "Lembrar de mim"
        savedAt: new Date().toISOString()
      };
      localStorage.setItem('savedCredentials', JSON.stringify(credentials));
    }

    // Carregar credenciais salvas
    loadSavedCredentials() {
      const saved = localStorage.getItem('savedCredentials');
      return saved ? JSON.parse(saved) : null;
    }

    // Limpar credenciais salvas
    clearSavedCredentials() {
      localStorage.removeItem('savedCredentials');
    }

    // Método para validar credenciais salvas
    validateSavedCredentials(credentials) {
      if (!credentials || !credentials.savedAt) return false;
      
      // Verifica se as credenciais têm menos de 30 dias
      const savedDate = new Date(credentials.savedAt);
      const now = new Date();
      const diffDays = (now - savedDate) / (1000 * 60 * 60 * 24);
      
      return diffDays <= 30; // Expira após 30 dias
    }

    // Login de usuário
    async loginUser(username, password, remember = false) {
      try {
        this.checkLoginAttempts(username);
        
        const hashedPassword = await this.hashPassword(password);
        const user = this.users.find(u => u.username === username);

        if (!user) {
          throw new Error('Usuário não encontrado.');
        }

        if (user.password !== hashedPassword) {
          this.recordLoginAttempt(username, false);
          throw new Error('Senha incorreta.');
        }

        this.recordLoginAttempt(username, true);
        const avatar = this.generateAvatar(user.username);
        // Criar sessão
        const sessionData = {
          userId: user.id,
          username: user.username,
          isAdmin: user.isAdmin, // Adiciona status de admin à sessão
          avatar: avatar, // Salva o avatar na sessão
          loginTime: new Date().toISOString()
        };

        localStorage.setItem('userSession', JSON.stringify(sessionData));

        // Gerenciar credenciais salvas
        if (remember) {
          this.saveCredentials(username, password);
        } else {
          this.clearSavedCredentials();
        }

        return true;
      } catch (error) {
        console.error('Erro no login:', error);
        throw error; // Propaga o erro para ser tratado pelo manipulador do formulário
      }
    }

    // Atualizar painel de usuário
    updateUserPanel() {
      const userPanel = document.getElementById('user-panel');
      const userNameSpan = document.getElementById('user-name');
      const userAvatar = userPanel ? userPanel.querySelector('img') : null;
      const logoutLink = document.getElementById('logout-link');

      // Verificar se há uma sessão ativa
      const sessionData = JSON.parse(localStorage.getItem('userSession'));

      if (sessionData && userPanel) {
        // Encontrar usuário na lista de usuários
        const user = this.users.find(u => u.id === sessionData.userId);

        if (user) {
          // Mostrar painel de usuário
          userPanel.classList.remove('hidden');

          // Atualizar nome de usuário com link para o perfil
          userNameSpan.innerHTML = `<a href="profile.html" class="hover:text-purple-600 transition-colors">${user.username}</a>`;

          // Mostrar link de logout
          logoutLink.classList.remove('hidden');

          // Usar o avatar da sessão e adicionar link para o perfil
          if (userAvatar) {
            userAvatar.src = sessionData.avatar;
            userAvatar.style.cursor = 'pointer';
            userAvatar.onclick = () => window.location.href = 'profile.html';
            userAvatar.title = 'Ver perfil';
          }

          return true;
        }
      } else if (userNameSpan) {
        // Se não houver sessão, mostrar link de login e esconder logout
        userNameSpan.innerHTML = '<a href="./login/signin.html">Login</a>';
        if (logoutLink) {
          logoutLink.classList.add('hidden');
        }
      }

      return false;
    }

    // Gerar avatar único baseado no nome de usuário
    generateAvatar(username) {
      // Gerar cor baseada no hash do nome de usuário
      let hash = 0;
      for (let i = 0; i < username.length; i++) {
        hash = username.charCodeAt(i) + ((hash << 5) - hash);
      }

      // Gerar uma cor mais agradável usando HSL
      const hue = hash % 360;
      const saturation = 70; // Fixo em 70% para cores não muito saturadas
      const lightness = 60;  // Fixo em 60% para cores não muito claras ou escuras

      // Converter HSL para HEX
      const color = this.hslToHex(hue, saturation, lightness);

      // Retorna URL do avatar usando a cor gerada
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=${color.substring(1)}&color=ffffff&size=100`;
    }

    // Função auxiliar para converter HSL para HEX
    hslToHex(h, s, l) {
      l /= 100;
      const a = s * Math.min(l, 1 - l) / 100;
      const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
      };
      return `#${f(0)}${f(8)}${f(4)}`;
    }

    // Logout
    logout() {
      // Remover sessão
      localStorage.removeItem('userSession');
      this.clearSavedCredentials();
      // Recarrega a janela
      window.location.reload();
    }

    // Método atualizado para mostrar erros com feedback visual
    showError(message) {
        // Remove qualquer mensagem de erro existente
        this.clearErrors();

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            background-color: #ff5757;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            margin-bottom: 16px;
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1000;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            animation: slideDown 0.3s ease-out;
            max-width: 90%;
            text-align: center;
        `;

        // Adiciona estilo para a animação
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideDown {
                from {
                    transform: translate(-50%, -100%);
                    opacity: 0;
                }
                to {
                    transform: translate(-50%, 0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(errorDiv);

        // Remove a mensagem após 5 segundos com animação de fade out
        setTimeout(() => {
            errorDiv.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => errorDiv.remove(), 300);
        }, 5000);
    }

    // Método para limpar mensagens de erro existentes
    clearErrors() {
        const existingErrors = document.querySelectorAll('.error-message');
        existingErrors.forEach(error => error.remove());
    }

    // Migrar senhas antigas para hash
    async migrateOldPasswords() {
      let needsSave = false;
      for (let user of this.users) {
        // Verifica se a senha não está em formato hash (64 caracteres hex)
        if (user.password && user.password.length !== 64) {
          user.password = await this.hashPassword(user.password);
          needsSave = true;
        }
      }
      if (needsSave) {
        this.saveUsers();
      }
    }
  }

  // Inicializar AuthManager
  const authManager = new AuthManager();
  await authManager.migrateOldPasswords(); // Migra senhas antigas

  // Atualizar painel de usuário ao carregar página
  authManager.updateUserPanel();

  // Registro de usuário
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', async function (event) {
      event.preventDefault();
      try {
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        const success = await authManager.registerUser(
          username,
          email,
          password,
          confirmPassword
        );

        if (success) {
          alert('Conta criada com sucesso!');
          window.location.href = 'signin.html';
        }
      } catch (error) {
        authManager.showError(error.message);
      }
    });
  }

  // Login de usuário
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    const savedCredentials = authManager.loadSavedCredentials();
    if (savedCredentials && authManager.validateSavedCredentials(savedCredentials)) {
      document.getElementById('username').value = savedCredentials.username;
      document.getElementById('password').value = savedCredentials.password;
      document.getElementById('remember-me').checked = true;
    } else {
      authManager.clearSavedCredentials(); // Limpa credenciais expiradas
    }

    loginForm.addEventListener('submit', async function (event) {
      event.preventDefault();
      const submitButton = this.querySelector('button[type="submit"]');
      submitButton.disabled = true;

      try {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember-me').checked;

        await authManager.loginUser(username, password, remember);
        authManager.updateUserPanel();
        window.location.href = '../inicio.html';
      } catch (error) {
        authManager.showError(error.message);
      } finally {
        submitButton.disabled = false;
      }
    });
  }

  // Adicionar botão/link de logout (se existir)
  const logoutLink = document.getElementById('logout-link');
  if (logoutLink) {
    logoutLink.addEventListener('click', function (event) {
      event.preventDefault();
      authManager.logout();
    });
  }
});