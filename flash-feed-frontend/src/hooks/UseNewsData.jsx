import { useState, useEffect } from "react";
import { getAllNewsData } from "../services/NewsDataService";

const useNewsData = (category, search) => {
  const [allNews, setAllNews] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadNews(true);
  }, [category, search]);

  const loadNews = async (reset = false) => {
    if (reset) {
      setIsLoading(true);
    } else {
      setIsLoadingMore(true);
    }

    try {
      const apiCategory = category === "all" ? "" : category;
      const currentPage = reset ? 1 : page;
      const res = await getAllNewsData(apiCategory, search, currentPage, 10);
      const articles = res.data.data;
      if (reset) {
        setAllNews(articles);
        setPage(2);
      } else {
        setAllNews((prev) => [...prev, ...articles]);
        setPage((prev) => prev + 1);
      }
      setHasMore(articles.length === 10);
    } catch (err) {
      setError(err);
    } finally {
      if (reset) {
        setIsLoading(false);
      } else {
        setIsLoadingMore(false);
      }
    }
  };
  // Returning an object is better for scaling than returning just the array
  return {
    allNews,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    loadMore: () => loadNews(),
  };
};

export default useNewsData;
