import fs from "fs";
import fetch from "node-fetch";

const category = "all_news"; // change category if needed
const url = `https://inshorts.com/api/en/news?category=${category}&max_limit=10&include _card_data=true`;

async function fetchNews() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    fs.writeFileSync(
      "./public/news.json",
      JSON.stringify(data, null, 2)
    );

    console.log("News saved to public/news.json");
  } catch (error) {
    console.error("Error fetching news:", error);
  }
}

fetchNews();