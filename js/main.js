document.addEventListener('DOMContentLoaded', () => {
    // 1. Lógica de Alternância de Tema
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const htmlElement = document.documentElement;

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                htmlElement.setAttribute('data-theme', 'light');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            } else {
                htmlElement.setAttribute('data-theme', 'dark');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        });
    }

    // 2. Carregamento Dinâmico dos Projetos via JSON
    const projectsContainer = document.getElementById('projects-container');

    if (projectsContainer) {
        fetch('projects.json')
            .then(response => response.json())
            .then(projects => {
                projectsContainer.innerHTML = ''; // Limpa o container

                projects.forEach(project => {
                    // Cria as tags (pílulas) dinamicamente com um map/join
                    const tagsHTML = project.tags
                        .map(tag => `<span class="badge-pill">${tag}</span>`)
                        .join('');

                    // Monta a estrutura HTML do card
                    const cardHTML = `
                        <div class="col-lg-4 col-md-6">
                            <div class="project-card h-100 d-flex flex-column justify-content-between">
                                <div>
                                    <div class="preview-container">
                                        <img src="${project.image}" alt="${project.title}" class="project-preview-img">
                                    </div>
                                    <div class="p-4">
                                        <span class="text-uppercase fw-bold small mb-1 d-block" style="color: #c084fc; letter-spacing: 0.5px;">${project.title}</span>
                                        <h3 class="h5 fw-bold mb-2 card-title-custom">${project.subtitle}</h3>
                                        <p class="small mb-3 card-text-custom">${project.description}</p>
                                        <div class="d-flex flex-wrap gap-2 mb-3">
                                            ${tagsHTML}
                                        </div>
                                    </div>
                                </div>
                                <div class="p-4 pt-0 d-flex flex-column gap-2">
                                    <a href="${project.demoUrl}" target="_blank" class="btn btn-demo w-100 py-2"><i class="fa-regular fa-eye me-2"></i>View Demo</a>
                                    <a href="${project.codeUrl}" target="_blank" class="btn btn-template w-100 py-2"><i class="fa-solid fa-code-branch me-2"></i>Detalhes do Código</a>
                                </div>
                            </div>
                        </div>
                    `;

                    projectsContainer.innerHTML += cardHTML;
                });
            })
            .catch(error => console.error('Erro ao carregar os projetos:', error));
    }
});