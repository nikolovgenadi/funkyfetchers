import axios from 'axios';
import {} from "../dist/src/ff.js"

document.addEventListener('DOMContentLoaded', async function () {
	let country = 'Sweden';
	const apiKey = import.meta.env.VITE_apiKey;

	const categories = [
		'https://newsapi.org/v2/everything?domains=wsj.com&apiKey=' + apiKey,
		'https://newsapi.org/v2/top-headlines?country=us&apiKey=' + apiKey,
		'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=' +
		apiKey,
	];

	function displayAllNewsOnLoad() {
		displayNewsByIndex(0);
		console.log('Load all news on page load.');
	}

	const dataObjects = Array.from({ length: categories.length }, () => []);

	for (let index = 0; index < categories.length; index++) {
		try {
			const response = await axios.get(categories[index]);
			const articles = response.data.articles;
			dataObjects[index] = articles;
			localStorage.setItem(
				`newsData_${index}`,
				JSON.stringify(dataObjects[index])
			);
			if (globalArticles.length > 1000) {
				globalArticles = [];
			}
			globalArticles.push(articles);
			console.log("After pushing: ", globalArticles)
			displayAllNewsOnLoad();
			// console.log(dataObjects[index]);
		} catch (error) {
			console.error(
				`Error fetching the data from ${categories[index]};`,
				error
			);
		}
	}

	function displayNewsByIndex(index) {
		const newsContainers = [
			'news-wrapper-0',
			'news-wrapper-1',
			'news-wrapper-2',
			'news-wrapper-3'		];
		const storedData = localStorage.getItem(`newsData_${index}`);
		const newsCont = document.querySelector(`#news-wrapper-${index}`);

		if (newsCont) {
			newsCont.innerHTML = '';
		} else {
			console.error(`No data found for ${index}.`);
			return;
		}

		if (storedData) {
			const articles = JSON.parse(storedData);
			//
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

		newsCont.innerHTML = '';

		articles.forEach((article) => {
			if (article.title && article.urlToImage && article.description) {
				const newsItem = document.createElement('div');
				newsItem.classList.add("news-item");
				newsItem.innerHTML = `
          <h3 class="news-title">${article.title}</h3>
		  <img src="${article.urlToImage}" class="news-image" />
          <p class="news-desc">${article.description}</p>
		  <p class="news-author">${article.author}</p>
		  <p class="news-date">${article.publishedAt}</p>
          <a href="${article.url}" target="_blank">Visit the webpage</a>
		  <i class="fa-solid fa-star fav-btn"></i>`;
				newsCont.appendChild(newsItem);	
				const isFavourite = favouriteArticles.some(a => a.title === article.title);
				const favBtn = newsItem.querySelector('.fav-btn');
				if (isFavourite) {
					favBtn.style.color = "#FFBF00";
				} else {
					favBtn.style.color = "#FFFFFF";
				}
			}
		});

	}

	const displayNewsBtn1 = document.querySelector('#news-wrapper-0-btn');
	const displayTopNewsBtn2 = document.querySelector('#news-wrapper-1-btn');
	const displayBusinessNewsBtn3 = document.querySelector('#news-wrapper-2-btn');
	const displayFavouritesBtn = document.querySelector("#news-wrapper-3-btn")

	displayNewsBtn1.addEventListener('click', () => {
		displayNewsByIndex(0);
		console.log('all news button is clicked');
	});

	displayTopNewsBtn2.addEventListener('click', () => {
		displayNewsByIndex(1);
		console.log('top news button is clicked');
	});

	displayBusinessNewsBtn3.addEventListener('click', () => {
		displayNewsByIndex(2);
		console.log('business news button is clicked');
	});

	displayFavouritesBtn.addEventListener('click', () => {
		displayFavourite();
		console.log('favourite container news btn clicked');
	});

	//Andys kod
	let currentDisplayIndex = 0;

	const sortNewestBtn = document.querySelector('#sort-newest-btn');
	const sortOldestBtn = document.querySelector('#sort-oldest-btn');

	sortNewestBtn.addEventListener('click', () => {
		sortArticlesByDate('newest');
	});

	sortOldestBtn.addEventListener('click', () => {
		sortArticlesByDate('oldest');
	});

	function sortArticlesByDate(order) {
		const storedData = localStorage.getItem(`newsData_${currentDisplayIndex}`);

		if (storedData) {
			let articles = JSON.parse(storedData);

			articles.sort((a, b) => {
				const dateA = new Date(a.publishedAt);
				const dateB = new Date(b.publishedAt);

				if (order === 'newest') {
					return dateB - dateA;
				} else {
					return dateA - dateB;
				}
			});

			localStorage.setItem(
				`newsData_${currentDisplayIndex}`,
				JSON.stringify(articles)
			);
			displayNewsByIndex(currentDisplayIndex);
		} else {
			console.error(`No data found for ${currentDisplayIndex}.`);
		}
	}



	//Nataliias kod - Filtrering med keyword/author name/date/

	function filterArticles() {
		const searchInput = document.getElementById('search-input');
		const filterInput = searchInput.value.trim().toLowerCase();
		const articles = document.querySelectorAll(".news-item");
	
		articles.forEach(article => {
			const titleElement = article.querySelector('.news-title');
			const authorElement = article.querySelector('.news-author');
			const descElement = article.querySelector('.news-desc');
			const dateElement = article.querySelector('.news-date');
	
			const titleText = titleElement.textContent.toLowerCase();
			const authorText = authorElement.textContent.toLowerCase();
			const descText = descElement.textContent.toLowerCase();
			const dateText = dateElement.textContent;
	
			if (filterInput === '') {
				removeHighlight(titleElement);
				removeHighlight(authorElement);
				removeHighlight(descElement);
				removeHighlight(dateElement);
				article.classList.remove('hidden');
				return;
			}
	
			removeHighlight(titleElement);
			removeHighlight(authorElement);
			removeHighlight(descElement);
			removeHighlight(dateElement);
	
			if (titleText.includes(filterInput)) {
				article.classList.remove('hidden');
				highlightMatch(titleElement, filterInput);
			} else if (authorText.includes(filterInput)) {
				article.classList.remove('hidden');
				highlightMatch(authorElement, filterInput);
			} else if (descText.includes(filterInput)) {
				article.classList.remove('hidden');
				highlightMatch(descElement, filterInput);
			} else if (dateText.includes(filterInput)) {
				article.classList.remove('hidden');
				highlightMatch(dateElement, filterInput);
			} else {
				article.classList.add('hidden');
			}
		});
	}
	
	const searchInput = document.getElementById('search-input');
	searchInput.addEventListener('input', filterArticles);
	
	function highlightMatch(element, filterInput) {
		const innerText = element.textContent;
		const index = innerText.toLowerCase().indexOf(filterInput);
		const markedText = innerText.slice(0, index) + '<mark>' + innerText.slice(index, index + filterInput.length) + '</mark>' + innerText.slice(index + filterInput.length);
		element.innerHTML = markedText;
	}
	
	function removeHighlight(element) {
		element.innerHTML = element.textContent;
	}
	function updateFavouriteArticlesStorage() {
		localStorage.setItem('favouriteArticles', JSON.stringify(favouriteArticles));
	}

	// Lucas Code - Favourite marking function
	function newFav(event) {
		if (event.target.classList.contains('fav-btn')) {
			const newsItem = event.target.closest('div');
			// Ensure you're selecting the right element for the article title
			const articleTitle = newsItem.querySelector('h3')?.textContent.trim();

			// Find the article in the globalArticles array
			const article = globalArticles.flat().find(a => a.title === articleTitle);

			if (article) {
				// Checks if favouriteArticles already contains an article with the same title as the one pressed
				const isFavourite = favouriteArticles.some(a => a.title === articleTitle);
				if (isFavourite) {
					// Remove from favorites
					event.target.style.color = "#FFFFFF";
					favouriteArticles = favouriteArticles.filter(a => a.title !== articleTitle);
					console.log(favouriteArticles)
				} else {
					// Add to favorites
					event.target.style.color = "#FFBF00";
					favouriteArticles.push(article);
					console.log(favouriteArticles)
				}
				updateFavouriteArticlesStorage();
			} else {
				console.log("Article not found", articleTitle);
			}
		}
	}

	function displayFavourite() {
		const favContainer = document.querySelector(`#news-wrapper-3`);
		console.log(favouriteArticles)
		let newsItem = "";
		favouriteArticles.forEach((article) => {
			if (article.title && article.urlToImage && article.description) {
				newsItem +=
					`<div>
					<img src="${article.urlToImage}" class="news-image" />
				  <h3>${article.title}</h3>
				  <p>${article.description}</p>
				  <a href="${article.url}" target="_blank">Visit the webpage</a>
				  <i class="fa-solid fa-star fav-btn"></i>
				  </div>`;
			}
			/* 			const isFavourite = favouriteArticles.some(a => a.title === article.title);
					const favBtn = newsItem.querySelector('.fav-btn');
					favBtn.style.color = "#FFBF00"; */
		})
		favContainer.innerHTML = newsItem;
		displayFavContainer();
	}

	function displayFavContainer() {
		const news0 = document.querySelector(`#news-wrapper-0`);
		const news1 = document.querySelector(`#news-wrapper-1`);
		const news2 = document.querySelector(`#news-wrapper-2`);
		const favContainer = document.querySelector(`#news-wrapper-3`);
		news0.style.display = "none";
		news1.style.display = "none";
		news2.style.display = "none";
		favContainer.style.display = "block"
	}

	mainWrapper.addEventListener('click', newFav);
});

const mainWrapper = document.querySelector('.main-wrapper');
let favouriteArticles = JSON.parse(localStorage.getItem('favouriteArticles') || '[]');
let globalArticles = JSON.parse(localStorage.getItem('globalArticles') || '[]');

// Exported function to get favorite articles
export function getFavouriteArticles() {
    return favouriteArticles;
}

// New function to set favorite articles
export function setFavouriteArticles(newFavourites) {
    favouriteArticles = newFavourites;
    localStorage.setItem('favouriteArticles', JSON.stringify(favouriteArticles));
}