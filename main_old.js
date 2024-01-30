import axios from 'axios';

let country = 'Sweden';

const apiKey = import.meta.env.VITE_API_KEY;
const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
// const newsDataKey = import.meta.env.VITE_NEWSDATA_KEY;
// const NEWS_DATA_URL = `https://newsdata.io/api/1/news?apikey=${newsDataKey}`

// async function newsDataIo() {
//   try {
//     const response = await axios.get(NEWS_DATA_URL);
//     console.log(response);

//     const newsDataArticles = response.data.results;
//     const newsCont = document.querySelector(".toppnews-container");

//     newsDataArticles.forEach(result => {
//       if (
//         result.country &&
//         result.category &&
//         result.title &&
//         result.image_url &&
//         result.pubDate
//       ) {
//         const newsItems = document.createElement('div');
//         newsItems.innerHTML =
//         `<h3>${result.title}</h3>
//         <img src="${result.image_url}" class="news-image" />
//         <p>${result.description}</p>
//         <a href="${result.source_url}" target="_blank">Läs mer</a>
//         <hr>`;

//         newsCont.appendChild(newsItems);
//       }
//     });
//   } catch(error) {
//     console.log(error);
//   }
// }

// newsDataIo();

async function fetchNews(url) {
	try {
		const response = await axios.get(url);
		console.log(response);

		const newsArticles = response.data.articles;
		const newsCont = document.querySelector('.toppnews-container');
		newsArticles.forEach(function (article) {
			if (
				article.title &&
				article.urlToImage &&
				article.description &&
				article.url &&
				article.publishedAt
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
		console.log('Something went wrong: ' + error);
	}
}

fetchNews(url);
