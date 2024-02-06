import axios from 'axios';

document.addEventListener('DOMContentLoaded', async function () {
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

	// fix the reset for each array
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
      	globalArticles.push(articles);
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
			'news-wrapper-3',
			'news-wrapper-4',
		];
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
				newsItem.innerHTML = `<img src="${article.urlToImage}" class="news-image" />
          <h3>${article.title}</h3>
          <p>${article.description}</p>
          <a href="${article.url}" target="_blank">Visit the webpage</a>
          <i class="fa-solid fa-star fav-btn"></i>`;
				newsCont.appendChild(newsItem);
			}
		});
	}

	const displayNewsBtn1 = document.querySelector('#news-wrapper-0-btn');
	const displayTopNewsBtn2 = document.querySelector('#news-wrapper-1-btn');
	const displayBusinessNewsBtn3 = document.querySelector('#news-wrapper-2-btn');
  const displayFavouritesBtn = document.querySelector("#news-wrapper-4-btn")

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

  	displayFavouritesBtn.addEventListener("click", () => {
    		dispayFavourite();
    		console.log('favourite container');
  	});

	//Andys kod
/* 	let currentDisplayIndex = 0;

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
	} */
});

const mainWrapper = document.querySelector('.main-wrapper');
let favouriteArticles = JSON.parse(localStorage.getItem('favouriteArticles') || '[]');
let globalArticles = [];

function updateFavouriteArticlesStorage() {
    localStorage.setItem('favouriteArticles', JSON.stringify(favouriteArticles));
}

function newFav(event) {
    if (event.target.classList.contains('fav-btn')) {
        const newsItem = event.target.closest('div');
        // Ensure you're selecting the right element for the article title
        const articleTitle = newsItem.querySelector('h3')?.textContent.trim(); 

        // Find the article in the globalArticles array
        const article = globalArticles.flat().find(a => a.title === articleTitle);

        if (article) {
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
                console.log(globalArticles);
                console.log(favouriteArticles)
            }
            updateFavouriteArticlesStorage();
        } else {
            console.log("Article not found", articleTitle);
        }
    }
}

mainWrapper.addEventListener('click', newFav);
