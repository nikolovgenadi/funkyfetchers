import { getArticles } from "./main.js";

const mainWrapper = document.querySelector('.main-wrapper');

function loadFavorites() {
    const favorites = localStorage.getItem('favouriteList');
    return favorites ? JSON.parse(favorites) : [];
}


function saveFavorites(favorites) {
    localStorage.setItem('favouriteList', JSON.stringify(favorites));
}

function newFav(event) {
    if (event.target.classList.contains('fav-btn')) {
        event.target.style.color = "#FFBF00"
        const parentElement = event.target.parentNode;
        const articleTitle = parentElement.querySelector('.articleTitle')

        const articles = getArticles();
        const article = articles.find(a => a.title === articleTitle);

        if (article) {
            console.log("Article found:", article.title);
            // Load the current favorites
            const favorites = loadFavorites();
            // Add the found article to the favorites list, avoiding duplicates
            if (!favorites.some(fav => fav.title === article.title)) {
                favorites.push(article);
                saveFavorites(favorites); // Save the updated favorites list
                console.log(favorites)
                console.log("Article added to favorites");
            } else {
                console.log("Article is already in favorites");
            }
        }

    }

}

mainWrapper.addEventListener('click' , newFav)