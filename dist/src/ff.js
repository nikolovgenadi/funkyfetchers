import { setFavouriteArticles } from "./main.js";
const clearFavBtn = document.querySelector("#clear-fav-btn");
export function clearFav() {
    setFavouriteArticles([]);
}
clearFavBtn?.addEventListener("click", clearFav);
