// Classe para gerenciamento da barra de navegação e barra lateral
class Navbar {
  constructor() {
    // Template HTML principal da navbar com menu lateral e painel de usuário
    this.navHTML = `
      <!-- Menu Container -->
      <div class="nav-menu-container">
        <!-- Menu Toggle Button -->
        <button id="menu-toggle" class="menu-toggle-btn" title="Alternar Menu de Navegação">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>
        </button>
        
        <!-- Logo -->
        <div class="logo-container">
          <a href="index.html" class="logo-link">
            <svg class="logo-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z"/>
            </svg>
            <span class="logo-text">Animu</span>
          </a>
        </div>
      </div>

      <nav class="fixed top-0 left-0 right-0 backdrop-blur-md shadow-sm z-50">
        <div class="container mx-auto px-4">
          <div class="flex items-center justify-between h-16">
            <!-- Espaço reservado para o menu e logo -->
            <div class="w-40"></div>

            <!-- Barra de pesquisa -->
            <div class="flex-1 max-w-xl mx-4" id="search-area">
              <!-- Gerada via JavaScript -->
            </div>

            <!-- Área do usuário -->
            <div class="flex items-center space-x-4">
              <!-- Botão para esconder/mostrar navbar -->
              <button id="toggle-navbar" class="nav-toggle-btn" title="Esconder/Mostrar Barra de Navegação">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" class="nav-toggle-icon">
                  <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
                </svg>
              </button>

              <!-- Painel do usuário -->
              <div id="user-panel" class="flex items-center">
                ${this.getUserPanel()}
              </div>

              <!-- Dropdown do seletor de temas -->
              <div class="theme-selector">
                <button id="theme-dropdown-btn" class="theme-dropdown-btn" title="Personalizar tema">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24">
                    <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-3.03 0-5.5-2.47-5.5-5.5 0-1.82.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/>
                  </svg>
                </button>
                <div id="theme-menu" class="theme-menu hidden">
                  <button data-theme="system" class="theme-option">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M20 3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h3l-1 1v2h12v-2l-1-1h3c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H4V5h16v11z"/>
                    </svg>
                    <span>Sistema</span>
                  </button>
                  <button data-theme="light" class="theme-option">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
                    </svg>
                    <span>Claro</span>
                  </button>
                  <button data-theme="dark" class="theme-option">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-3.03 0-5.5-2.47-5.5-5.5 0-1.82.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/>
                    </svg>
                    <span>Escuro</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <!-- Menu Lateral -->
      <div id="side-menu" class="side-menu">
        <div class="side-menu-content">
          <a href="index.html" class="nav-link" title="Ir para página inicial">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <span>Início</span>
          </a>
          <a href="animes.html" class="nav-link" title="Ver lista de animes">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24">
              <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
            </svg>
            <span>Animes</span>
          </a>
          <a href="recommendation.html" class="nav-link" title="Ver recomendações de animes">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
            <span>Recomendações</span>
          </a>
          <a href="news.html" class="nav-link" title="Ver notícias sobre animes">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-6h11v6zm0-8H4V6h11v4zm5 8h-4V6h4v12z"/>
            </svg>
            <span>Notícias</span>
          </a>
          <a href="profile.html" class="nav-link" title="Acessar perfil do usuário">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            <span>Perfil</span>
          </a>
          <a href="category.html" class="nav-link" title="Explorar categorias de animes">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24">
              <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
            </svg>
            <span>Categorias</span>
          </a>
          <a href="about.html" class="nav-link" title="Informações sobre o site">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
            <span>Sobre</span>
          </a>
          <!-- Opções de Admin (inicialmente ocultas) -->
          <div id="admin-options" class="hidden">
            <a href="./admin-users.html" class="nav-link admin-link" title="Gerenciar usuários do sistema">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                </svg>
              <span>Gerenciar Usuários</span>
            </a>
            <a href="./admin-category.html" class="nav-link admin-link" title="Gerenciar categorias de animes">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24">
                <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
              </svg>
              <span>Gerenciar Categorias</span>
            </a>
            <a href="./admin-animes.html" class="nav-link admin-link" title="Gerenciar catálogo de animes">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24">
                <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zM12 5.5v9l6-4.5z"/>
              </svg>
              <span>Gerenciar Animes</span>
            </a>
            <a href="./admin-news.html" class="nav-link admin-link" title="Gerenciar notícias do site">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-6h11v6zm0-8H4V6h11v4zm5 8h-4V6h4v12z"/>
              </svg>
              <span>Gerenciar Notícias</span>
            </a>
          </div>
        </div>
      </div>
      <div id="menu-overlay" class="menu-overlay"></div>
    `;

    // Adiciona suporte a navegação por teclado
    this.setupKeyboardNav();
    
    // Adiciona suporte a gestos touch
    this.setupTouchGestures();
    
    // Adiciona observador de conexão
    this.setupConnectionObserver();
  }

  // Gera o painel do usuário com avatar e opções de login/logout
  getUserPanel() {
    const userSession = JSON.parse(localStorage.getItem('userSession'));

    if (userSession) {
      return `
        <div class="relative">
          <button id="user-dropdown-btn" class="flex items-center focus:outline-none" title="Menu do usuário">
            <img class="h-10 w-10 rounded-full object-cover" src="${userSession.avatar || 'https://ui-avatars.com/api/?name=User&background=random'}" alt="Avatar do Usuário" />
          </button>
          <div id="user-dropdown" class="user-dropdown hidden">
            <a href="./profile.html" class="dropdown-item">
              <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              <span>Perfil</span>
            </a>
            <button class="dropdown-item text-red-600" id="logout-btn">
              <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24">
                <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
              </svg>
              <span>Sair</span>
            </button>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="relative">
          <button id="auth-dropdown-btn" class="auth-btn focus:outline-none" title="Opções de Login">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </button>
          <div id="auth-dropdown" class="user-dropdown hidden">
            <a href="./signin.html" class="dropdown-item">
              <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24">
                <path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z"/>
              </svg>
              <span>Entrar</span>
            </a>
            <a href="./signup.html" class="dropdown-item">
              <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24">
                <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              <span>Criar Conta</span>
            </a>
          </div>
        </div>
      `;
    }
  }

  // Inicializa todos os componentes da navbar
  init() {
    // Insere a navbar no início do body
    document.body.insertAdjacentHTML('afterbegin', this.navHTML);
    document.body.classList.add('has-navbar');

    // Destaca o link da página atual
    this.highlightCurrentPage();

    this.checkLoginStatus();
    this.initSideMenu();
    this.initUserDropdown();
    this.initAuthDropdown();
  }

  // Marca o link ativo baseado na URL atual, tratando páginas normais e admin
  highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop().split('?')[0]; // Ignora parâmetros após o .html

    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
      const href = link.getAttribute('href').split('?')[0]; // Ignora parâmetros do href também
      const isAdminPage = currentPage.startsWith('admin-');
      const isAdminLink = href.startsWith('./admin-');

      // Verifica se é uma página de administração
      if (isAdminPage && isAdminLink) {
        // Remove o './' do início do href para comparação
        const cleanHref = href.replace('./', '');
        if (currentPage === cleanHref) link.classList.add('active');
        else link.classList.remove('active');
      }
      // Verifica páginas normais
      else if (!isAdminPage && !isAdminLink) {
        if (currentPage === href ||
          (currentPage.includes('anime') && href === 'animes.html') ||
          (currentPage === '' && href === 'index.html')) {
          link.classList.add('active');
        } else link.classList.remove('active');
      }
    });
  }

  // Verifica status de login e configura interface de acordo com permissões
  checkLoginStatus() {
    const userSession = JSON.parse(localStorage.getItem('userSession'));

    if (userSession) {
      const adminOptions = document.getElementById('admin-options');
      const userPanel = document.getElementById('user-panel');

      // Atualiza o avatar se disponível
      if (userSession.avatar && userPanel) {
        const avatarImg = userPanel.querySelector('img');
        if (avatarImg) {
          avatarImg.src = userSession.avatar;
        }
      }

      // Mostra as opções de admin no menu lateral se o usuário for admin
      if (adminOptions && userSession.isAdmin) {
        console.log('Usuário é admin, mostrando opções de admin');
        adminOptions.classList.remove('hidden');
        // Adiciona classe específica para links de admin
        const adminLinks = adminOptions.querySelectorAll('.nav-link');
        adminLinks.forEach(link => { link.classList.add('admin-link'); });
      }
    }
  }

  // Gerencia o menu de administração dropdown
  initAdminMenu() {
    const adminButton = document.getElementById('admin-menu-button');
    const adminMenu = document.getElementById('admin-menu-items');

    if (adminButton && adminMenu) {
      // Adiciona manipulador de clique ao botão
      adminButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        adminMenu.classList.toggle('hidden');
      });

      // Fecha o menu ao clicar em qualquer lugar fora
      document.addEventListener('click', (e) => {
        if (!adminButton.contains(e.target) && !adminMenu.contains(e.target)) adminMenu.classList.add('hidden');
      });

      // Previne que cliques dentro do menu o fechem
      adminMenu.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }
  }

  // Gerencia estados e eventos do menu lateral, incluindo persistência
  initSideMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const sideMenu = document.getElementById('side-menu');
    const menuOverlay = document.getElementById('menu-overlay');

    // Verifica o estado do menu ao carregar a página
    const menuState = localStorage.getItem('sideMenuState');
    if (menuState === 'open') {
      sideMenu.classList.add('open');
      menuOverlay.classList.add('show');
      document.body.classList.add('menu-open');
    }

    menuToggle.addEventListener('click', () => {
      sideMenu.classList.toggle('open');
      menuOverlay.classList.toggle('show');
      document.body.classList.toggle('menu-open');

      // Salva o estado do menu
      const isOpen = sideMenu.classList.contains('open');
      localStorage.setItem('sideMenuState', isOpen ? 'open' : 'closed');
    });
  }

  // Inicializa o dropdown do usuário
  initUserDropdown() {
    const dropdownBtn = document.getElementById('user-dropdown-btn');
    const dropdown = document.getElementById('user-dropdown');
    const logoutBtn = document.getElementById('logout-btn');

    if (dropdownBtn && dropdown) {
      dropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('hidden');
      });

      document.addEventListener('click', (e) => {
        if (!dropdownBtn.contains(e.target) && !dropdown.contains(e.target)) dropdown.classList.add('hidden');
      });
    }

    if (logoutBtn) logoutBtn.addEventListener('click', this.handleLogout);
  }

  // Inicializa o dropdown de autenticação
  initAuthDropdown() {
    const authBtn = document.getElementById('auth-dropdown-btn');
    const authDropdown = document.getElementById('auth-dropdown');

    if (authBtn && authDropdown) {
      authBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        authDropdown.classList.toggle('hidden');
      });

      document.addEventListener('click', (e) => {
        if (!authBtn.contains(e.target) && !authDropdown.contains(e.target)) authDropdown.classList.add('hidden');
      });
    }
  }

  // Limpa sessão e redireciona para login
  handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem('userSession');
    window.location.href = './signin.html';
  }

  setupKeyboardNav() {
    document.addEventListener('keydown', (e) => {
      // ESC fecha menus
      if (e.key === 'Escape') this.closeAllMenus();

      // Alt + M toggle menu lateral
      if (e.key === 'm' && e.altKey) document.getElementById('menu-toggle').click();
    });

    // Navegação por Tab nos menus
    const menuItems = document.querySelectorAll('.nav-link, .dropdown-item');
    menuItems.forEach(item => {
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') e.target.click();
      });
    });
  }

  setupTouchGestures() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, false);

    document.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].clientX;
      this.handleSwipe();
    }, false);

    this.handleSwipe = () => {
      const swipeDistance = touchEndX - touchStartX;
      const sideMenu = document.getElementById('side-menu');
      
      if (Math.abs(swipeDistance) > 50) { // Mínimo de 50px
        if (swipeDistance > 0)  sideMenu.classList.add('open'); // Swipe direita
        else sideMenu.classList.remove('open'); // Swipe esquerda
      }
    }
  }

  setupConnectionObserver() {
    // Monitora estado da conexão
    window.addEventListener('online', () => { this.updateConnectionStatus(true); });
    
    window.addEventListener('offline', () => { this.updateConnectionStatus(false); });
  }

  // Atualiza o estado da conexão e estiliza links de acordo
  updateConnectionStatus(isOnline) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      if (!isOnline) {
        link.setAttribute('data-offline', 'true');
        link.style.opacity = '0.5';
        link.title += ' (Offline)';
      } else {
        link.removeAttribute('data-offline');
        link.style.opacity = '';
        link.title = link.title.replace(' (Offline)', '');
      }
    });
  }

  closeAllMenus() {
    // Fecha menu lateral
    document.getElementById('side-menu').classList.remove('open');
    
    // Fecha dropdowns
    document.querySelectorAll('.user-dropdown, .theme-menu').forEach(menu => menu.classList.add('hidden'));
  }
}

// Inicializa quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  const navbar = new Navbar();
  navbar.init();
});