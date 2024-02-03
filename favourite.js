import { articles } from "./main.js";

const mainWrapper = document.querySelector('.main-wrapper');

function newFav(event) {
    if (event.target.classList.contains('fav-btn')) {
        event.target.style.color = "#FFBF00"
        const parentElement = event.target.parentNode;
        const siblingElement = parentElement.querySelector('.articleTitle')

        if  (siblingElement) {
            console.log("den finns")
        }
    }

}

mainWrapper.addEventListener('click' , newFav)