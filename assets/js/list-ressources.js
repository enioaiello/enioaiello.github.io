document.addEventListener("DOMContentLoaded", () => {
    // Chemin vers le fichier JSON
    const jsonFilePath = "https://enioaiello.github.io/assets/data/ressources.json";

    // Fonction pour générer le HTML d'une ressource
    const generateRessourceHTML = (ressource) => {
        return `
            <div class="ressource">
                <h3 class="ressource-title">${ressource.name}</h3>
                <p class="ressource-date">${ressource.date}</p>
                <p class="ressource-description">${ressource.description}</p>
                <p class="ressource-container-link">
                    <a href="${ressource.ressource}" class="ressource-link">Consulter</a>
                </p>
            </div>
        `;
    };

    // Fonction pour insérer les ressources dans les bonnes catégories
    const insertRessourcesIntoCategories = (ressources) => {
        ressources.forEach(ressource => {
            const categoryDiv = document.querySelector(`#${ressource.category.toLowerCase()}`); // ID basé sur la catégorie
            if (categoryDiv) {
                categoryDiv.innerHTML += generateRessourceHTML(ressource);
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