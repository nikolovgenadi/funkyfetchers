import axios from 'axios';
const apiKey = import.meta.env.VITE_API_KEY;

let originalArray = [];
let sortedArray = [];
let isSorted = false;

const fetchNews = async (apiKey) => {
	try {
		const response = await axios.get(
			`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
		);
		originalArray = response.data.articles;
		sortedArray = [...originalArray];
		// OM inte localStorage används så används originalArray
		localStorage.setItem('newsData', JSON.stringify(response.data));
	} catch (error) {
		console.error('Error fetching data: ', error);
		throw error;
	}
};

async function fetchAndUpdateData(apiKey) {
	try {
		await fetchNews(apiKey);
		console.log('Data fetched and updated in localstorage');
	} catch (error) {
		console.error('Error fetching and updating data: ', error);
	}
}

function sortByOldest(articles) {
	return articles.sort((a, b) => {
		return new Date(a.publishedAt) - new Date(b.publishedAt);
	});
}

window.addEventListener('load', async () => {
	await fetchAndUpdateData(apiKey);

	const savedData = localStorage.getItem('newsData');

	if (savedData || originalArray) {
		const newsArray = JSON.parse(savedData);
		renderArticles(originalArray);
	} else {
		console.log('No data found in localstorage!');
	}

	// "Toggla" mellan senaste och äldsta nyheter
	function toggleSortedArray() {
		console.log('Toggle sorted function');
		isSorted = !isSorted;
		if (isSorted) {
			sortedArray === sortByOldest(sortedArray);
			toggleSortedButton.textContent = 'Senaste Nyheterna';
		} else {
			sortedArray = [...originalArray];
			toggleSortedButton.textContent = 'Äldsta Nyheterna';
		}
		renderArticles(sortedArray);
	}

	// Visa senaste nyheter (original array)
	function showLatestNews() {
		sortedArray = [...originalArray];
		toggleSortedButton.textContent = 'Äldsta Nyheterna';
	}

	// Visa äldsta nyheter
	function showOldestNews() {
		sortedArray === sortByOldest(sortedArray);
		toggleSortedButton.textContent = 'Senaste Nyheterna';
	}

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

	// Använd denna under för att "toggla" mellan senaste och äldsta nyheter
	const toggleSortedButton = document.querySelector('#toggle-sorted-news');
	toggleSortedButton.addEventListener('click', toggleSortedArray);

	// Använd dessa under för två knappar, en för senaste nyheter och en för äldsta.

	// const showLatestNewsButton = document.querySelector('#latest-news-button');
	// showLatestNewsButton.addEventListener('click', showLatestNews);

	// const showOldestNewsButton = document.querySelector('#oldest-news-button');
	// showOldestNewsButton.addEventListener('click', showOldestNews);
});
