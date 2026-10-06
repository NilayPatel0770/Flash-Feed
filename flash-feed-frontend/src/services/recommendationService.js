import API from "../api/api";

export const getRecommendations = (articleId) => {
  return API.get(`/api/recommendations/article/${articleId}`);
};