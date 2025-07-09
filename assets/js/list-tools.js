document.addEventListener("DOMContentLoaded", () => {
    // Chemin vers le fichier JSON
    const jsonFilePath = "https://enioaiello.github.io/assets/data/tools.json";

    // Fonction pour générer le HTML d'un outil
    const generateRessourceHTML = (tool) => {
        const icon = "https://enioaiello.github.io/assets/images/tools/";
        return `
            <div class="tool">
                <h3 class="tool-title">${tool.name}</h3>
                <p class="tool-description">${tool.description}</p>
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