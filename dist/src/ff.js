// Import the necessary function from the JavaScript module
import { setFavouriteArticles } from "./main.js";
const clearFavBtn = document.querySelector(".clear-fav-btn");
// Function to clear favorite articles
export function clearFav() {
    // Clear the array of favorite articles
    setFavouriteArticles([]);
}
// Attach the event listener if the button exists
clearFavBtn?.addEventListener("click", clearFav);
