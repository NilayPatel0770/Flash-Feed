import API from "../api/api";

export const likeArticle = (id) =>
    API.post(`/api/news/${id}/like`);

export const unlikeArticle = (id) =>
    API.delete(`/api/news/${id}/like`);

export const bookmarkArticle = (id) =>
    API.post(`/api/news/${id}/bookmark`);

export const removeBookmark = (id) =>
    API.delete(`/api/news/${id}/bookmark`);

export const getBookmarks = () => {
  return API.get("/api/news/bookmarks");
};