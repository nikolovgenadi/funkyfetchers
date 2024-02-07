// Koden börjar med att importera Axios-biblioteket för att göra HTTP-förfrågningar.
// Den importerar också API-nyckeln från miljövariabler (Vite-miljövariabel).

//ANTECKNINGAR
//const storedData = localStorage.getItem(`newsData_${index}`); // newsData_0, newsData_1, newsData_2

//
import axios from 'axios';
const apiKey = import.meta.env.VITE_API_KEY;

// Lagra original- och sorterade news articles
let originalArray = [];
let sortedArray = [];

// Hämtar news articles API, den datan lagras i originalArray och en kopia görs i sortedArray. Informationen lagras också i localStorage.
const fetchNews = async (apiKey) => {
	try {
		const response = await axios.get(
			`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
		);
		originalArray = response.data.articles;
		sortedArray = [...originalArray];
		// Om inte localStorage används så används originalArray
		localStorage.setItem('newsData', JSON.stringify(response.data));
	} catch (error) {
		console.error('Error fetching data: ', error);
		throw error;
	}
};

// Anropar fetchNews och loggar ett meddelande om datan hämtas och uppdateras korrekt
async function fetchAndUpdateData(apiKey) {
	try {
		await fetchNews(apiKey);
		console.log('Data fetched and updated in localstorage');
	} catch (error) {
		console.error('Error fetching and updating data: ', error);
	}
}

// När fönstret laddas anropar den fetchAndUpdateData och hämtar från localStorage. OM data finns renderar den ut News articles annars loggas ett meddelande.
window.addEventListener('load', async () => {
	await fetchAndUpdateData(apiKey);

	const savedData = localStorage.getItem('newsData');

	if (savedData || originalArray) {
		const newsArray = JSON.parse(savedData);
		renderArticles(originalArray);
	} else {
		console.log('No data found in localstorage!');
	}

	// Tar en array av news articles och visar dem på hemsidan genom att skapa HTML-element dynamiskt.
	function renderArticles(articles) {
		console.log('RENDER: ', articles);
		const newsContainer = document.querySelector('.toppnews-container');
		newsContainer.innerHTML = '';
		articles.forEach((article) => {
			const newsItem = document.createElement('div');
			newsItem.innerHTML = `
				<h3>${article.title}</h3>
				<img src="${article.urlToImage}" class="news-image" />
				<p>${article.description}</p>
				<a href="${article.url}" target="_blank">Read more</a>
				<hr>
			`;
			newsContainer.appendChild(newsItem);
		});
	}

	// Sorterar news articles baserat på deras publishedAt egenskap dvs. datum
	function sortByOldest(articles) {
		return articles.sort((a, b) => {
			return new Date(a.publishedAt) - new Date(b.publishedAt);
		});
	}

	const showOldNewsButton = document.getElementById('show-oldest-news');
	showOldNewsButton.addEventListener('click', showOldestNews);

	// sorterar sortedArray genom att anropa showByOldest och renderar sedan news articles (Visa äldsta nyheter).
	function showOldestNews() {
		sortedArray = sortByOldest(sortedArray);
		renderArticles(sortedArray);
	}

	const showLatestNewsButton = document.getElementById('show-latest-news');
	showLatestNewsButton.addEventListener('click', showLatestNews);

	// Återställer sortedArray till originalArray och renderar news articles (Visa senaste nyheter (original array)).
	function showLatestNews() {
		sortedArray = [...originalArray];
		renderArticles(sortedArray);
	}
});
