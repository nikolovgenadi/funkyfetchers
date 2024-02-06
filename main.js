import axios from "axios";

let globalArticles = [];

document.addEventListener("DOMContentLoaded", async function () {
  let country = "Sweden";
  const apiKey = import.meta.env.VITE_API_KEY;

  // const currentDate = new Date();
  // const year = currentDate.getFullYear();
  // const month = String(currentDate.getMonth() + 1).toString().padStart(2, '0');
  // const day = String(currentDate.getDate().toString().padStart(2, '0'));

  // const theDate = `${year}-${month}-${day}`;
  // console.log(theDate);

  const categories = [
    "https://newsapi.org/v2/everything?domains=wsj.com&apiKey=" + apiKey,
    "https://newsapi.org/v2/top-headlines?country=us&apiKey=" + apiKey,
    "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=" + apiKey,
  ];

  // fix the reset for each array
  const dataObjects = Array.from({ length: categories.length }, () => []);

  for (let index = 0; index < categories.length; index++) {
    try {
      const response = await axios.get(categories[index]);
      const articles = response.data.articles;
      dataObjects[index] = articles;
      localStorage.setItem(`newsData_${index}`, JSON.stringify(dataObjects[index]));
      globalArticles.push(articles);
      // console.log(dataObjects[index]);
    } catch (error) {
      console.error(`Error fetching the data from ${categories[index]};`, error);
    }
  }

  function displayNewsByIndex(index) {
    const newsContainers = ["news-wrapper-0", "news-wrapper-1", "news-wrapper-2", "news-wrapper-3", "news-wrapper-4"];
    const storedData = localStorage.getItem(`newsData_${index}`);
    const newsCont = document.querySelector(`#news-wrapper-${index}`);

    if (newsCont) {
      newsCont.innerHTML = "";
    } else {
      console.error(`No data found for ${index}.`);
      return;
    }

    if (storedData) {
      const articles = JSON.parse(storedData);
      CreateArticlesInContainer(articles, index);

      newsContainers.forEach((container, i) => {
        const wrapper = document.getElementById(container);
        if (wrapper) {
          wrapper.style.display = i === index ? 'block' : 'none';
        }
      });
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
        article.description
      ) {
        const newsItem = document.createElement("div");
        newsItem.innerHTML = 
          `<div>
            <img src="${article.urlToImage}" class="news-image" />
            <h3 class="articleTitle">${article.title}</h3>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Visit the webpage</a>
            <i class="fa-solid fa-star fav-btn"></i>
          </div>`;
        newsCont.appendChild(newsItem);
      }
    });
  }

  const displayNewsBtn1 = document.querySelector("#news-wrapper-0-btn");
  const displayTopNewsBtn2 = document.querySelector("#news-wrapper-1-btn");
  const displayBusinessNewsBtn3 = document.querySelector("#news-wrapper-2-btn");
  const displayFavouritesBtn = document.querySelector("#news-wrapper-4-btn")

  displayNewsBtn1.addEventListener("click", () => {
    displayNewsByIndex(0);
    console.log('all news button is clicked');
  });

  displayTopNewsBtn2.addEventListener("click", () => {
    displayNewsByIndex(1);
    console.log('top news button is clicked');
    console.log(globalArticles)
  });

  displayBusinessNewsBtn3.addEventListener("click", () => {
    displayNewsByIndex(2);
    console.log('business news button is clicked');
  });

  displayFavouritesBtn.addEventListener("click", () => {
    displayNewsByIndex(4);
    console.log('favourite container');
  });
});

const mainWrapper = document.querySelector('.main-wrapper');
let favouriteArticles = [];

function newFav(event) {
  if (event.target.classList.contains('fav-btn')) {
    if (event.target.style.color == "#FFBF00") {
      event.target.style.color = "#FFFFFF";
    } else {
      event.target.style.color = "#FFBF00";
      const newsItem = event.target.closest('div');
      const articleTitleElement = newsItem.querySelector('.articleTitle');
      const articleTitle = articleTitleElement ? articleTitleElement.textContent.trim() : '';
  
      const article = globalArticles.find(a => a.title === articleTitle);
      if (article && !favouriteArticles.find(a => a.title === article.title)) {
        favouriteArticles.push(article);
        console.log('Article added to favorites:', article.title);
      } else if (!article) {
        console.log("Article not found", articleTitle);
      } else {
        console.log("Article already in favorites");
      }
    }
  }
}

mainWrapper.addEventListener('click' , newFav)
