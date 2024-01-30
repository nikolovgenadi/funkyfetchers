import axios from 'axios';
const apiKey = import.meta.env.VITE_API_KEY;

const fetchNews = async (apiKey) => {
	try {
		const response = await axios.get(
			`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
		);
		console.log(response);
		localStorage.setItem('newsData', JSON.stringify(response.data));
	} catch (error) {
		console.error('Error fetching data: ', error);
		throw error;
	}
};

fetchNews(apiKey);
