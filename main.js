import axios from "axios";

let country = "Sweden"

const apiKey = import.meta.env.VITE_API_KEY;
// const NEWSDATA_KEY = import.meta.env.VITE_NEWSDATA_KEY;
// const NEWS_DATA_URL = `https://newsdata.io/api/1/news?apikey=${NEWSDATA_KEY}`
const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`

// news data fetch
// async function newsDataIo() {
//   try {
//     const response = await axios.get(NEWS_DATA_URL);
//     console.log(response);

//     const newsDataArticles = response.data.results;
//     newsDataArticles.forEach(result)
//     if (
//       results.country &&
//       results.category &&
//       results.title &&
//       results.image_url &&
          // results.pubDate
//     ) {
        // const newsCont = document.querySelector(".toppnews-container");
        // const newsItems = document.createElement('div');
        // newsItems.innerHTML = 
        // `<h3>${results.title}</h3>
        // <img src="${results.image_url}" class="news-image" />
        // <p>${results.description}</p>
        // <a href="${results.source_url}" target="_blank">Läs mer</a>
        // <hr>`;
//     }
//   }
//   catch(error) {
//     console.log(error);
//   }
// }

// newsDataIo();

async function fetchNews(url) {
    try {
      const response = await axios.get(url);
      console.log(response);

      const newsArticles = response.data.articles;
const newsCont = document.querySelector(".toppnews-container");

newsArticles.forEach(function (article) {
  if (
    article.title &&
    article.urlToImage &&
    article.description &&
    article.url &&
    article.publishedAt &&
  ) {
  const newsItem = document.createElement('div');
  newsItem.innerHTML = `
    <h3>${article.title}</h3>
    <img src="${article.urlToImage}" class="news-image" />
    <p>${article.description}</p>
    <a href="${article.url}" target="_blank">Läs mer</a>
    <hr>
  `;
  newsCont.appendChild(newsItem);
  }
});

    } catch (error) {
      console.log("Something went wrong: " + error);
    }
}


fetchNews(url);	




