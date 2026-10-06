import API from "../api/api";

export const getLikedArticles = () => {
    return API.get("/api/news/liked");
};