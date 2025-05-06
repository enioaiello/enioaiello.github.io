document.addEventListener("DOMContentLoaded", () => {
    // Chemin vers le fichier JSON
    const jsonFilePath = "https://enioaiello.github.io/assets/data/projects.json";

    // Mapping des icônes Remixicon pour les langages/outils
    const languageIcons = {
        "PHP": '<i class="ri-php-fill"></i>',
        "HTML": '<i class="ri-html5-fill icon"></i>',
        "CSS": '<i class="ri-css3-fill"></i>',
        "JS": '<i class="ri-javascript-fill"></i>',
        "Bootstrap": '<i class="ri-bootstrap-fill"></i>',
        "Batch": '<i class="ri-terminal-fill"></i>'
    };

    // Fonction pour générer un projet HTML
    const generateProjectHTML = (project) => {
        const languageHTML = project.languages.map(language => {
            const icon = languageIcons[language] || ""; // Ajout de l'icône si elle existe
            return `<div class="language">${icon} ${language}</div>`;
        }).join("");

        const linksHTML = `
            ${project.github ? `<a href="https://github.com/${project.github.join('/')}" target="_blank" class="project-link"><i class="ri-github-fill"></i></a>` : ""}
            ${project.link ? `<a href="${project.link}" target="_blank" class="project-link"><i class="ri-earth-fill"></i></a>` : ""}
        `;

        return `
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
    };

    // Fonction pour insérer les projets dans les bonnes catégories
    const insertProjectsIntoCategories = (projects) => {
        projects.forEach(project => {
            const categoryDiv = document.querySelector(`#${project.category.toLowerCase()}`); // ID basé sur la catégorie
            if (categoryDiv) {
                categoryDiv.innerHTML += generateProjectHTML(project);
            }
        });
    };

    // Récupération des données JSON et insertion des projets
    fetch(jsonFilePath)
        .then(response => response.json())
        .then(projects => {
            insertProjectsIntoCategories(projects);
        })
        .catch(error => console.error("Erreur lors du chargement des projets :", error));
});