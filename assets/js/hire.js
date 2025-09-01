// Fonction qui choisit trois projets aléatoirement et les affiches
async function displayProjects() {
    document.querySelector(".projects").innerHTML = "";
    try {
        const response = await fetch("https://enioaiello.github.io/assets/data/projects.json");
        const projects = await response.json();

        // Filtre les projets qui ne sont pas de type "modèles"
        const filteredProjects = projects.filter(project => project.category !== "modèles");

        // Mélange aléatoire des projets filtrés
        const shuffledProjects = [...filteredProjects].sort(() => Math.random() - 0.5);

        // Sélectionne les 3 premiers projets
        const selectedProjects = shuffledProjects.slice(0, 3);

        // Crée et affiche les projets sélectionnés
        selectedProjects.forEach(project => {
            const languageIcons = {
                "PHP": '<i class="ri-php-fill"></i>',
                "HTML": '<i class="ri-html5-fill icon"></i>',
                "CSS": '<i class="ri-css3-fill"></i>',
                "JS": '<i class="ri-javascript-fill"></i>',
                "Bootstrap": '<i class="ri-bootstrap-fill"></i>',
                "Batch": '<i class="ri-terminal-fill"></i>'
            };

            const languageHTML = project.languages ? project.languages.map(language => {
                const icon = languageIcons[language] || "";
                return `<div class="language">${icon} ${language}</div>`;
            }).join("") : "";

            const linksHTML = `
                ${project.github ? `<a href="https://github.com/${project.github.join('/')}" target="_blank" class="project-link"><i class="ri-github-fill"></i></a>` : ""}
                ${project.link ? `<a href="${project.link}" target="_blank" class="project-link"><i class="ri-earth-fill"></i></a>` : ""}
            `;

            const projectHTML = `
                <div class="project">
                    <img src="${project.image}" alt="Projet ${project.name}" class="project-image">
                    <h3 class="project-title">${project.name}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-footer">
                        <div class="project-language">
                            ${languageHTML}
                        </div>
                        <div class="project-container-link">
                            ${linksHTML}
                        </div>
                    </div>
                </div>
            `;

            document.querySelector(".projects").innerHTML += projectHTML;
        });
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
        const response = await fetch("https://enioaiello.github.io/assets/data/skills.json");
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