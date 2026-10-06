import API from "../api/api";

export const getTrendingNews = () => {

    return API.get("/api/news/trending");

};