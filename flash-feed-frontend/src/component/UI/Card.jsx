import React from "react";
import {
  HeartIcon,
  BookmarkIcon,
  EyeIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import LikeButton from "../Common/LikeButton";
import BookmarkButton from "../Common/BookmarkButton";

const Card = ({ news }) => {
  const date = new Date(news.publishedAt);
  const navigate = useNavigate();
  const formattedDate = news.publishedAt
    ? new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(new Date(news.publishedAt))
    : "Unknown Date";
  return (
    <div
      className="mx-auto max-w-7xl bg-card rounded-2xl shadow-lg overflow-hidden mb-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
      onClick={() => navigate(`/article/${news._id}`)}
    >
      <div className="md:flex">
        {/* Image */}

        <div className="md:w-1/3">
          <img
            src={
              news.image && news.image.trim() !== ""
                ? news.image
                : "https://placehold.co/600x400?text=Flash+Feed"
            }
            alt={news.title}
            className="w-full h-64 md:h-full object-cover"
          />
        </div>

        {/* Content */}

        <div className="md:w-2/3 p-6 flex flex-col">
          {/* Category */}

          <span className="inline-block bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide w-fit">
            {news.category}
          </span>

          {/* Title */}

          <h2 className="font-bold text-2xl text-main-text mt-2">
            {news.title}
          </h2>

          {/* Source */}

          <div className="flex items-center gap-2 mt-3 text-sm text-muted-text">
            <ClockIcon className="w-4 h-4" />

            <span>{formattedDate}</span>

            {/* <span>•</span> */}

            <span>{news.source}</span>
          </div>

          {/* AI Summary */}

          <div className="mt-6">
            <h3 className="font-semibold text-main-text mb-2">AI Summary</h3>

            <ul className="list-disc ml-5 space-y-2 text-muted-text">
              {news.summary?.length > 0 ? (
                news.summary.map((point, index) => <li key={index}>{point}</li>)
              ) : (
                <p className="text-muted-text">{news.description}</p>
              )}
            </ul>
          </div>

          <div className="mt-6">
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/article/${news._id}`);
              }}
              className="px-5 py-2.5 rounded-lg bg-slate-900 dark:bg-blue-600 text-white hover:bg-blue-700 dark:hover:bg-blue-500 font-medium transition cursor-pointer"
            >
              Read Full Article →
            </button>
          </div>

          {/* Footer */}

          <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-auto pt-6 gap-4">
            {/* Like & Bookmark */}

            <div className="flex items-center gap-5">
              <LikeButton
                articleId={news._id}
                initialCount={news.likes}
                showCount={true}
              />

              <BookmarkButton
                articleId={news._id}
                initialCount={news.bookmarks}
                initialBookmarked={news.isBookmarked}
              />
            </div>

            {/* Stats */}

            <div className="flex items-center gap-6 text-sm text-muted-text">
              <div className="flex items-center gap-1">
                <EyeIcon className="w-5 h-5" />
                <span>{news.views || 0}</span>
              </div>

              <div className="flex items-center gap-1">
                <HeartIcon className="w-5 h-5 text-red-500" />
                <span>{news.likes || 0}</span>
              </div>

              <div className="flex items-center gap-1">
                <BookmarkIcon className="w-5 h-5 text-blue-500" />
                <span>{news.bookmarks || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
