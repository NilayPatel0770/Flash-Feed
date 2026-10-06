import API from "../api/api";

export const getBookmarks = () => {
  return API.get("/api/news/bookmarks");
};