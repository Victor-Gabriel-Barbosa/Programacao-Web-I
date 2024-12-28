// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener('DOMContentLoaded', () => {
  // Atualizar a seleção do botão de tema
  const themeToggle = document.querySelector('.toggle-theme');
  const body = document.body; // Referência ao elemento <body>

  // Verifica no localStorage se existe um tema salvo anteriormente
  const savedTheme = localStorage.getItem('theme');

  // Aplica o tema salvo ou o tema padrão do sistema
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode'); // Adiciona a classe para o modo escuro no <body>
    themeToggle.classList.add('dark'); // Adiciona a classe "dark" ao botão de alternância
  }

  // Adiciona um ouvinte de evento ao botão de alternância de tema
  themeToggle.addEventListener('click', () => {
    // Alterna entre os temas adicionando ou removendo a classe "dark-mode" no <body>
    body.classList.toggle('dark-mode');

    // Alterna a aparência do botão adicionando ou removendo a classe "dark"
    themeToggle.classList.toggle('dark');

    // Salva a preferência de tema no localStorage
    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark'); // Armazena "dark" como tema escolhido
    } else {
      localStorage.setItem('theme', 'light'); // Armazena "light" como tema escolhido
    }
  });

  // Seleciona os elementos do painel de administração e de usuário pelo ID
  const adminPanel = document.getElementById("admin-panel");
  const userPanel = document.getElementById("user-panel");

  // Obtém os dados da sessão
  const sessionData = JSON.parse(localStorage.getItem('userSession'));

  // Verifica se o usuário está logado e é admin
  if (sessionData && sessionData.isAdmin && adminPanel) {
    // Remove a classe "hidden" do painel de administração
    adminPanel.classList.remove("hidden");
  }

  const adminButton = document.getElementById('admin-menu-button');
  const adminMenu = document.getElementById('admin-menu-items');

  if (adminButton && adminMenu) {
    // Toggle do menu ao clicar no botão
    adminButton.addEventListener('click', (e) => {
      e.stopPropagation();
      adminMenu.classList.toggle('hidden');

      // Adiciona a classe de animação
      const gearIcon = adminButton.querySelector('svg');
      gearIcon.classList.add('gear-spin');

      // Remove a classe após a animação terminar
      setTimeout(() => {
        gearIcon.classList.remove('gear-spin');
      }, 600); // 600ms = duração da animação
    });

    // Fechar o menu ao clicar fora dele
    document.addEventListener('click', (e) => {
      if (!adminMenu.contains(e.target) && !adminButton.contains(e.target)) {
        adminMenu.classList.add('hidden');
      }
    });
  }

  // Renderiza os animes em destaque
  renderFeaturedAnimes();
});