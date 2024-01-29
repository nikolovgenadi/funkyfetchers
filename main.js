import axios from "axios";

document.addEventListener("DOMContentLoaded", async function () {
  let country = "Sweden";
  const apiKey = import.meta.env.VITE_API_KEY;

  const categories = [
    "https://newsapi.org/v2/everything?domains=wsj.com&apiKey=" + apiKey,
    "https://newsapi.org/v2/top-headlines?country=us&apiKey=" + apiKey,
    "https://newsapi.org/v2/everything?q=tesla&from=2023-12-26&sortBy=publishedAt&apiKey=" + apiKey,
    "https://newsapi.org/v2/everything?q=apple&from=2024-01-25&to=2024-01-25&sortBy=popularity&apiKey=" + apiKey,
    "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=" + apiKey,
  ];
// fix the reset for each array
  const dataObjects = {};

  for (let index = 0; index < categories.length; index++) {
    try {
      const response = await axios.get(categories[index]);
      const articles = response.data.articles;
      dataObjects[index] = articles;
      localStorage.setItem(`newsData_${index}`, JSON.stringify(dataObjects[index]));
    } catch (error) {
      console.error(`Error fetching the data from ${categories[index]};`, error);
    }
  }

  function displayNewsByIndex(index) {
    const storedData = localStorage.getItem(`newsData_${index}`);

    if (storedData) {
      const articles = JSON.parse(storedData);
      CreateArticlesInContainer(articles, index);
    } else {
      console.error(`No data found for ${index}.`);
    }
  }

  function CreateArticlesInContainer(articles, index) {
    const newsCont = document.querySelector(`#news-wrapper-${index}`);

    if (!newsCont) {
      console.error(`Container not found for ${index}.`);
      return;
    }

    newsCont.innerHTML = "";

    articles.forEach((article) => {
      if (
        article.title &&
        article.urlToImage &&
        article.description &&
        article.url &&
        article.publishedAt
      ) {
        const newsItem = document.createElement("div");
        newsItem.innerHTML = `<h3>${article.title}</h3>
          <img src="${article.urlToImage}" class="news-image" />
          <p>${article.description}</p>
          <a href="${article.url}" target="_blank">Läs mer</a>
          <hr>`;
        newsCont.appendChild(newsItem);
      }
    });
  }

  const displayNewsBtn1 = document.querySelector("#news-wrapper-0-btn");
  const displayTopNewsBtn2 = document.querySelector("#news-wrapper-1-btn");
  const displayTeslaNewsBtn3 = document.querySelector("#news-wrapper-2-btn");
  const displayAppleNewsBtn4 = document.querySelector("#news-wrapper-3-btn");
  const displayBusinessNewsBtn5 = document.querySelector("#news-wrapper-4-btn");

  displayNewsBtn1.addEventListener("click", () => displayNewsByIndex(0));
  displayTopNewsBtn2.addEventListener("click", () => displayNewsByIndex(1));
  displayTeslaNewsBtn3.addEventListener("click", () => displayNewsByIndex(2));
  displayAppleNewsBtn4.addEventListener("click", () => displayNewsByIndex(3));
  displayBusinessNewsBtn5.addEventListener("click", () => displayNewsByIndex(4));
});
