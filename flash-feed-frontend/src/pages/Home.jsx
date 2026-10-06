import React, { useEffect, useRef } from "react";
import UseNewsData from "../hooks/UseNewsData";
import Card from "../component/UI/Card";
import usePersonalizedNews from "../hooks/usePersonalizedNews";
import { useSearchParams } from "react-router-dom";
import CardSkeleton from "../component/UI/CardSkeleton";

const Home = () => {
  const { news: recommendedNews, loading: recommendationLoading } =
    usePersonalizedNews();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "all";
  const { allNews, isLoading, isLoadingMore, error, hasMore, loadMore } =
    UseNewsData(category, search);
  const observer = useRef();
  if (isLoading) {
    return (
      <div className="px-4">
        {[...Array(5)].map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    );
  }
  if (error) {
    return <p className="text-center mt-10">Error loading news</p>;
  }
  const lastArticleRef = (node) => {
    if (isLoading) return;

    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });

    if (node) {
      observer.current.observe(node);
    }
  };

  return (
    <div className="px-4">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-main-text mb-6">
          {search
            ? `Search Results for "${search}"`
            : category === "all"
              ? "Latest News"
              : `${category.charAt(0).toUpperCase() + category.slice(1)} News`}
        </h2>
        {allNews.map((news, index) => {
          if (index === allNews.length - 1) {
            return (
              <div ref={lastArticleRef} key={news._id}>
                <Card news={news} />
              </div>
            );
          }

          return <Card key={news._id} news={news} />;
        })}
      </div>
      {!search && category === "all" && recommendedNews.length > 0 && (
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-main-text mb-6">
            Recommended For You
          </h2>

          {recommendedNews.map((news) => (
            <div key={news._id}>
              <h2 className="text-red-500 font-bold">Recommended</h2>
              <Card news={news} />
            </div>
          ))}
        </div>
      )}

      {isLoadingMore &&
        [...Array(3)].map((_, index) => <CardSkeleton key={index} />)}
      {!hasMore && allNews.length > 0 && (
        <div className="text-center py-6 text-muted-text">
          You've reached the end.
        </div>
      )}
    </div>
  );
};

export default Home;
