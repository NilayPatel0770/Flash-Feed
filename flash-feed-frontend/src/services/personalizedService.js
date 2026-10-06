import API from "../api/api";

export const getPersonalizedNews = () => {
    return API.get("/api/recommendations/personalized");
};