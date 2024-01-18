import axios from "axios";

let country = "Sweden"
const apiKey = "b2390ee5e1844aebb09d9b85a5ffa158";
const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`

async function fetchNews(url) {
    try {
      const response = await axios.get(url);
      console.log(response);

    } catch (error) {
      console.log("Something went wrong: " + error);
    }
}

fetchNews(url);	

