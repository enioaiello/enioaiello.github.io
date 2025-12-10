// Code global du site (animations, etc.)

function scrollToAnchor() {
    const path = location.hash.slice(1); // Enlève le # du début
    const parts = path.split('/');

    if (parts[0] === 'tools' && parts[1]) {
        const anchorElement = document.getElementById(parts[1]);
        if (anchorElement) {
            setTimeout(() => {
                anchorElement.scrollIntoView({behavior: 'smooth'});
            }, 100);
        }
    }
}

function onViewLoaded(path) {
    console.log(`Vue chargée : ${path}`);
    scrollToAnchor();
    if (path === '/') {
        loadHome();
    }

    if (path === '/projets') {
        loadProjects();
    }

    if (path === '/ressources') {
        loadRessources();
    }

    if (path === '/tools') {
        loadTools();
    }

    if (path === "/videos") {
        loadVideos();
    }

    if (path === "/hire") {
        loadHire();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const topButton = document.querySelector('.top-button');

    window.addEventListener('scroll', function () {
        // Afficher le bouton après 100px de défilement
        if (window.scrollY > 100) {
            topButton.style.display = 'flex';
            // Délai pour permettre la transition
            setTimeout(() => {
                topButton.style.opacity = '1';
            }, 10);
        } else {
            topButton.style.opacity = '0';
            // Cacher le bouton après la transition
            setTimeout(() => {
                topButton.style.display = 'none';
            }, 300);
        }
    });
});

async function loadHome() {
    try {
        const res = await fetch('assets/data/projects.json');
        const projects = await res.json();
        const container = document.querySelector('.projects');

        if (!container) return;

        // Sélectionner aléatoirement 6 projets maximum
        const shuffledProjects = projects
            .filter(project => project.category !== "Templates")
            .sort(() => Math.random() - 0.5)
            .slice(0, 6);

        // Mapping des icônes Remixicon pour les langages/outils
        const languageIcons = {
            "PHP": '<i class="ri-php-fill"></i>',
            "HTML": '<i class="ri-html5-fill icon"></i>',
            "CSS": '<i class="ri-css3-fill"></i>',
            "JS": '<i class="ri-javascript-fill"></i>',
            "Bootstrap": '<i class="ri-bootstrap-fill"></i>',
            "Batch": '<i class="ri-terminal-fill"></i>'
        };

        container.innerHTML = shuffledProjects.map(p => `
            <div class="project">
                <img src="${p.image}" alt="Capture d'écran ${p.name}" class="image">
                <h3 class="title">${p.name}</h3>
                <div class="other">
                    ${p.languages ? `
                        <div class="languages">
                            ${p.languages.map(lang => `
                                <span class="language">
                                    ${languageIcons[lang] || ''} ${lang}
                                </span>
                            `).join('')}
                        </div>
                ` : ''}
                    <a href="#${p.information}" class="button">
                        <i class="ri-information-fill"></i>
                    </a>
                </div>
            </div>
        `).join('');
        container.innerHTML += `
            <a href="#/projects" class="link more-projects"><i class="ri-folder-open-fill"></i> En voir plus</a>
        `;
    } catch (err) {
        console.error('Erreur lors du chargement des projets :', err);
    }
    try {
        const res = await fetch('assets/data/ressources.json');
        const ressources = await res.json();
        const container = document.querySelector('.ressources');

        if (!container) return;

        container.innerHTML = ressources.map(r => `
            <div class="ressource">
                <img src="assets/images/ressources/${r.image}" alt="${r.name}" class="image">
                <h3 class="title">${r.name}</h3>
                <h4 class="date">${r.date}</h4>
                <p class="text">${r.description}</p>
            </div>
        `).join('');
        container.innerHTML += `
            <a href="#/ressources" class="link more-ressources"><i class="ri-folder-open-fill"></i> En voir plus</a>
        `;

        // Ajouter les event listeners
        const ressourceElements = container.querySelectorAll('.ressource');
        ressourceElements.forEach((element, index) => {
            element.addEventListener('click', () => {
                const ressource = ressources[index];
                window.open(ressource.ressource);
            });
        });
    } catch (err) {
        console.error('Erreur lors du chargement des ressources :', err);
    }
}

async function loadProjects() {
    try {
        const res = await fetch('assets/data/projects.json');
        const projects = await res.json();
        const container = document.querySelector('.projects');
        if (!container) return;

        // Mapping des icônes Remixicon pour les langages/outils
        const languageIcons = {
            "PHP": '<i class="ri-php-fill"></i>',
            "HTML": '<i class="ri-html5-fill icon"></i>',
            "CSS": '<i class="ri-css3-fill"></i>',
            "JS": '<i class="ri-javascript-fill"></i>',
            "Bootstrap": '<i class="ri-bootstrap-fill"></i>',
            "Batch": '<i class="ri-terminal-fill"></i>'
        };

        container.innerHTML = projects.map(p => `
            <div class="project">
                <img src="${p.image}" alt="Capture d'écran ${p.name}" class="image">
                <h3 class="title">${p.name}</h3>
                <div class="other">
                    ${p.languages ? `
                        <div class="languages">
                            ${p.languages.map(lang => `
                                <span class="language">
                                    ${languageIcons[lang] || ''} ${lang}
                                </span>
                            `).join('')}
                        </div>
                ` : '<div class="languages none"></div>'}
                    <a href="#${p.information}" class="button">
                        <i class="ri-information-fill"></i>
                    </a>
                </div>
            </div>
        `).join('');
    } catch (err) {
        console.error('Erreur lors du chargement des projets :', err);
    }
}

async function loadRessources() {
    try {
        const res = await fetch('assets/data/ressources.json');
        const ressources = await res.json();
        const container = document.querySelector('.ressources');

        if (!container) return;

        container.innerHTML = ressources.map(r => `
            <div class="ressource">
                <img src="assets/images/ressources/${r.image}" alt="${r.name}" class="image">
                <h3 class="title">${r.name}</h3>
                <h4 class="date">${r.date}</h4>
                <p class="text">${r.description}</p>
            </div>
        `).join('');

        // Ajouter les event listeners
        const ressourceElements = container.querySelectorAll('.ressource');
        ressourceElements.forEach((element, index) => {
            element.addEventListener('click', () => {
                const ressource = ressources[index];
                window.open(ressource.ressource);
            });
        });
    } catch (err) {
        console.error('Erreur lors du chargement des ressources :', err);
    }
}

async function loadTools() {
    try {
        const res = await fetch('assets/data/tools.json');
        const tools = await res.json();
        const container = document.querySelector('.tools');

        if (!container) return;

        // Récupère les containers
        const osContainer = container.querySelector('.os');
        const softwareContainer = container.querySelector('.software');

        // Défini les badges
        const badges = {
            "power": "Power User",
            "ocpl": "OpenCore Legacy Patcher",
            "jailbreak": "Jailbreaked",
            "dualboot": "Dual Booted"
        };

        // Trie les outils par catégorie
        const toolsByCategory = tools.reduce((acc, tool) => {
            if (!acc[tool.category]) {
            acc[tool.category] = [];
            }
            acc[tool.category].push(tool);
            return acc;
        }, {});

        // Fonction pour générer le HTML d'un outil
        const generateToolHTML = (tool) => {
            // Gestion du badge et de l'état
            let badgesHTML = '<div class="badges">';
            if (tool.badge) {
            tool.badge.forEach(badge => {
                if (badges[badge]) {
                badgesHTML += `<span class="${badge}">${badges[badge]}</span>`;
                }
            });
            }
            if (tool.state === "used") {
            badgesHTML += ` <span class="state used">Utilisé</span>`;
            } else if (tool.state === "not-used") {
            badgesHTML += ` <span class="state not-used">Pas utilisé dernièrement</span>`;
            }
            badgesHTML += '</div>';

            // URL de l'icône
            const iconPath = "https://enioaiello.github.io/assets/images/tools/" + tool.icon;

            return `
            <div class="tool">
                <img src="${iconPath}" alt="Logo de ${tool.name}" class="icon">
                <div class="description">
                <h3 class="title">${tool.name}</h3>
                <h4 class="version">${tool.version}</h4>
                ${badgesHTML}
                </div>
            </div>
            `;
        };

        // Affiche les outils par catégorie
        if (osContainer) {
            osContainer.innerHTML = toolsByCategory.os
            ? toolsByCategory.os
                .map(tool => generateToolHTML(tool))
                .join('')
            : '<p class="empty">Aucun système d\'exploitation disponible pour le moment.</p>';
        }

        if (softwareContainer) {
            softwareContainer.innerHTML = toolsByCategory.software
            ? toolsByCategory.software
                .map(tool => generateToolHTML(tool))
                .join('')
            : '<p class="empty">Aucun logiciel disponible pour le moment.</p>';
        }

    } catch (err) {
        console.error('Erreur lors du chargement des outils :', err);
    }
}

async function loadVideos() {
    // Charge toutes les vidéos par ordre de parution depuis la chaîne YouTube @enioaiello

}

async function loadHire() {
    // Fonction qui choisit trois projets aléatoirement et les affiches
    async function displayProjects() {
        document.querySelector(".projects").innerHTML = "";
        try {
            const response = await fetch("/assets/data/projects.json");
            const projects = await response.json();
            // Filtre les projets qui ne sont pas de type "modèles"
            const filteredProjects = projects.filter(project => project.category !== "modèles");
            // Mélange aléatoire des projets filtrés
            const shuffledProjects = [...filteredProjects].sort(() => Math.random() - 0.5);
            // Sélectionne les 3 premiers projets
            const selectedProjects = shuffledProjects.slice(0, 4);
            // Défini le container
            const container = document.querySelector(".projects");
            // Mapping des icônes Remixicon pour les langages/outils
            const languageIcons = {
                "PHP": '<i class="ri-php-fill"></i>',
                "HTML": '<i class="ri-html5-fill icon"></i>',
                "CSS": '<i class="ri-css3-fill"></i>',
                "JS": '<i class="ri-javascript-fill"></i>',
                "Bootstrap": '<i class="ri-bootstrap-fill"></i>',
                "Batch": '<i class="ri-terminal-fill"></i>'
            };
            // Crée et affiche les projets sélectionnés
            container.innerHTML = selectedProjects.map(p => `
                <div class="project">
                    <img src="${p.image}" alt="Capture d'écran ${p.name}" class="image">
                    <h3 class="title">${p.name}</h3>
                    <p class="description">${p.description}</p>
                    <div class="other">
                        ${p.languages ? `
                            <div class="languages">
                                ${p.languages.map(lang => `
                                    <span class="language">
                                        ${languageIcons[lang] || ''} ${lang}
                                    </span>
                                `).join('')}
                            </div>
                        ` : '<div class="languages none"></div>'}
                        <a href="#${p.link}" class="button">
                            <i class="ri-information-fill"></i>
                        </a>
                    </div>
                </div>
            `).join('');
        } catch (error) {
            console.error("Erreur lors du chargement des projets aléatoires:", error);
            document.querySelector(".projects").innerHTML = `
                <div class="error">
                    <i class="icon ri-error-warning-line"></i>
                    <h2 class="error-title">Impossible de récupérer les projets</h2>
                    <p class="error-description">Réessayez plus tard.</p>
                    <p class="error-message">${error}</p>
                </div>
            `;
        }
    }
    // Fonction qui affiche toutes les compétences et les tris en fonction de leurs catégories
    async function displaySkills() {
        try {
            const response = await fetch("/assets/data/skills.json");
            const skills = await response.json();
            skills.forEach(skill => {
                const categoryDiv = document.querySelector(`.${skill.category.toLowerCase()}`);
                if (categoryDiv) {
                    const skillElement = document.createElement('li');
                    skillElement.classList.add('skill');
                    skillElement.innerHTML = `${skill.name}`;
                    categoryDiv.appendChild(skillElement);
                }
            });
        } catch (error) {
            console.error("Erreur lors du chargement des compétences:", error);
            document.querySelector(".skills").innerHTML = `
                <div class="error">
                    <i class="icon ri-error-warning-line"></i>
                    <h2 class="error-title">Impossible de récupérer les compétences</h2>
                    <p class="error-description">Réessayez plus tard.</p>
                    <p class="error-message">${error}</p>
                </div>
            `;
        }
    }
    // Appelle des fonctions
    displaySkills();
    displayProjects();
    // Ajout des écouteurs d'événements
    document.querySelector("#refresh").addEventListener("click", displayProjects);
}

document.addEventListener('DOMContentLoaded', () => {
    const topButton = document.querySelector('.top-button');

    if (topButton) {
        topButton.addEventListener('click', () => {
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header");
    const burger = document.querySelector(".burger");
    const navLinks = document.querySelectorAll(".links .link");

    if (!header || !burger) {
        return;
    }

    function toggleMenu() {
        const isOpen = header.classList.toggle("menu-open");
        burger.classList.toggle("is-active", isOpen);
        burger.setAttribute("aria-expanded", String(isOpen));

        // Bloquer le scroll en arrière-plan quand le menu est ouvert
        document.body.style.overflow = isOpen ? "hidden" : "";
    }

    burger.addEventListener("click", toggleMenu);

    // Ferme le menu lorsque l'on clique sur un lien
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (header.classList.contains("menu-open")) {
                toggleMenu();
            }
        });
    });
});