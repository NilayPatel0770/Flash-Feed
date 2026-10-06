import axios from "axios";
import API from "../api/api";
// const baseUrl = "https://inshorts.com/api/en/news?category=";
// // to get all news
// export const getAllNewsData = async (category) => {
//   const newsData = `${baseUrl}${category}&max_limit=100&include_card_data=true`;
//   return await axios.get(`${newsData}`);
// };

// to get all news
export const getAllNewsData = (
    category,
    search,
    page = 1,
    limit = 10
) => {

    const params = {
        page,
        limit
    };

    if (category) {
        params.category = category;
    }

    if (search) {
        params.search = search;
    }

    return API.get("/api/news", {
        params
    });
};



