document.addEventListener("DOMContentLoaded", () => {
    // Chemin vers le fichier JSON
    const jsonFilePath = "https://enioaiello.github.io/assets/data/tools.json";

    // Fonction pour générer le HTML d'un outil
    const generateRessourceHTML = (tool) => {
        const icon = "https://enioaiello.github.io/assets/images/tools/";
        const badges = {
            "power": "Power User"
        };

        // Badge éventuel selon propriété 'badge'
        let badgeHTML = '';
        if (tool.badge && badges[tool.badge]) {
            badgeHTML = `<span class="badge">${badges[tool.badge]}</span>`;
        }

        // Badge ou texte d'état d'utilisation
        let stateHTML = '';
        if (tool.state === "used") {
            stateHTML = `<span class="state used">Utilisé</span>`;
        } else if (tool.state === "not-used") {
            stateHTML = `<span class="state not-used">Pas utilisé</span>`;
        }

        return `
        <div class="tool">
            <img src="${tool.icon}" alt="Logo de ${tool.name}" class="tool-icon">
            <div class="tool-description">
                <h3 class="tool-title">${tool.name}</h3>
                <h4 class="tool-version">${tool.version}</h4>
                <div class="badges">
                    ${badgeHTML} ${stateHTML}
                </div>
            </div>
        </div>
    `;
    };

    // Fonction pour insérer les outils dans les bonnes catégories
    const insertRessourcesIntoCategories = (tools) => {
        tools.forEach(tool => {
            const categoryDiv = document.querySelector(`#${tool.category.toLowerCase()}`); // ID basé sur la catégorie
            if (categoryDiv) {
                categoryDiv.innerHTML += generateRessourceHTML(tool);
            }
        });
    };

    // Récupération des données JSON et insertion des ressources
    fetch(jsonFilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(ressources => {
            insertRessourcesIntoCategories(ressources);
        })
        .catch(error => console.error("Erreur lors du chargement des ressources :", error));
});