import { getArticles } from "./main.js";

let favouriteArticles = [];

const mainWrapper = document.querySelector('.main-wrapper');



function newFav(event) {
    if (event.target.classList.contains('fav-btn')) {
        event.target.style.color = "#FFBF00"
        const newsItem = event.target.closest('div'); // Assuming your structure has a div wrapping each article
        const articleTitleElement = newsItem.querySelector('.articleTitle');
        const articleTitle = articleTitleElement ? articleTitleElement.textContent.trim() : '';


        const articles = getArticles();
        console.log(articles)
        const article = articles.find(a => a.title === articleTitle);

        if (articles) {
            favouriteArticles.push(article);
            console.log('Article added to favorites:', favouriteArticles);
        } else {
            console.log("Article not found");
        }

        /* if (article && !favouriteArticles.includes(article)) {
            favouriteArticles.push(article);
            console.log('Article added to favorites:', favouriteArticles);
        } else if (!article) {
            console.log("Article not found", articleTitle);
        } else {
            console.log("Article already in favorites");
        } */
    }

}

mainWrapper.addEventListener('click' , newFav)
