import axios from "axios";

let country = "Sweden"

const apiKey = import.meta.env.VITE_API_KEY;
const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`

async function fetchNews(url) {
    try {
      const response = await axios.get(url);
      console.log(response);

      const newsArticles = response.data.articles;
const newsCont = document.querySelector(".toppnews-container");

newsArticles.forEach(function (article) {
  const newsItem = document.createElement('div');
  newsItem.innerHTML = `
    <h3>${article.title}</h3>
    <img src="${article.urlToImage}" class="news-image" />
    <p>${article.description}</p>
    <a href="${article.url}" target="_blank">Läs mer</a>
    <hr>
  `;
  newsCont.appendChild(newsItem);
});

    } catch (error) {
      console.log("Something went wrong: " + error);
    }
}

fetchNews(url);	




