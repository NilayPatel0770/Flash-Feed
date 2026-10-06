import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  EyeIcon,
  HeartIcon,
  BookmarkIcon,
  ClockIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { saveHistory } from "../services/historyService";
import { useAuth } from "../context/AuthContext";
import { getArticle } from "../services/articleService";
import { getRecommendations } from "../services/recommendationService";
import { useNavigate } from "react-router-dom";
import LikeButton from "../component/Common/LikeButton";
import BookmarkButton from "../component/Common/BookmarkButton";
import ShareButton from "../component/Common/ShareButton";

const Article = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    loadArticle();
    loadRecommendations();
  }, [id]);

  const loadArticle = async () => {
    try {
      const res = await getArticle(id);

      setArticle(res.data.article);
      if (isAuthenticated) {
        await saveHistory(id);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const loadRecommendations = async () => {
    try {
      const res = await getRecommendations(id);

      setRecommendations(res.data.recommendations || []);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-main-text">Loading article...</div>
    );
  }

  if (!article) {
    return (
      <div className="text-center py-20 text-main-text">Article not found.</div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      {/* Image */}

      <img
        src={article.image}
        alt={article.title}
        className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
      />

      {/* Category */}

      <div className="mt-8">
        <span className="px-4 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 text-sm font-semibold">
          {article.category}
        </span>
      </div>

      {/* Title */}

      <h1 className="mt-5 text-4xl font-bold text-main-text">
        {article.title}
      </h1>

      {/* Meta */}

      <div className="flex flex-wrap items-center gap-6 mt-6 text-muted-text">
        <div className="flex items-center gap-2">
          <ClockIcon className="w-5 h-5" />

          {new Date(article.publishedAt).toLocaleString()}
        </div>

        <div>
          Source :<span className="font-semibold ml-2">{article.source}</span>
        </div>
      </div>

      {/* Summary */}

      <div className="mt-12 bg-card rounded-xl shadow p-8">
        <h2 className="text-2xl font-bold text-main-text mb-6">AI Summary</h2>

        <ul className="space-y-4 list-disc pl-6">
          {article.summary?.map((point, index) => (
            <li key={index} className="text-muted-text leading-7">
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* Keywords */}

      <div className="mt-10">
        <h2 className="text-xl font-bold text-main-text mb-5">Keywords</h2>

        <div className="flex flex-wrap gap-3">
          {article.keywords?.map((keyword, index) => (
            <span
              key={index}
              className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow text-main-text"
            >
              <TagIcon className="w-4 h-4" />

              {keyword}
            </span>
          ))}
        </div>
      </div>

      {/* Sentiment */}

      <div className="mt-10">
        <h2 className="text-xl font-bold text-main-text">Sentiment</h2>

        <p className="mt-3 text-lg text-muted-text">{article.sentiment}</p>
      </div>

      {/* Stats */}

      {/* Article Statistics & Actions */}

      <div className="mt-12 flex flex-wrap justify-between items-center bg-card rounded-xl shadow p-5">
        {/* Left Side */}

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-main-text">
            <EyeIcon className="w-6 h-6" />

            <span>{article.views}</span>
          </div>

          <div className="flex items-center gap-2 text-main-text">
            <LikeButton articleId={article._id} initialCount={article.likes} />
          </div>

          <div className="flex items-center gap-2 text-main-text">
            <BookmarkButton
              articleId={article._id}
              initialCount={article.bookmarks}
            />
          </div>
          <ShareButton article={article} />
        </div>

        {/* Right Side */}

        <div className="text-sm text-muted-text">{article.source}</div>
      </div>

      {/* Original Article */}
      {(article.sourceUrl || article.url) && (
        <div className="mt-12">
          <a
            href={article.sourceUrl || article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-main-text text-inv-text px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition shadow-md"
          >
            <span>Read Original Article on {article.source || "Publisher"}</span>
            <span>→</span>
          </a>
        </div>
      )}


      <div className="mt-16">
        <h2 className="text-3xl font-bold text-main-text mb-8">
          Related Articles
        </h2>

        {recommendations.length === 0 ? (
          <p className="text-muted-text">No recommendations available.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {recommendations.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/article/${item._id}`)}
                className="bg-card rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4">
                  <span className="text-xs font-semibold text-blue-600">
                    {item.category}
                  </span>

                  <h3 className="mt-2 font-semibold text-main-text line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm text-muted-text line-clamp-3">
                    {item.summary?.[0]}
                  </p>

                  <div className="mt-4 flex justify-between text-sm">
                    <span className="text-muted-text">{item.source}</span>

                    <span className="font-semibold text-green-600">
                      {(item.score * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Article;
