import API from "../api/api";

export const saveHistory = (articleId) => {
    return API.post(`/api/news/${articleId}/history`);
};

export const getHistory = () => {
    return API.get("/api/news/history");
};