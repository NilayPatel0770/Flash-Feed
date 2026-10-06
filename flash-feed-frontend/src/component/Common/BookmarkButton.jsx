import { useEffect, useState } from "react";
import { BookmarkIcon as OutlineBookmark } from "@heroicons/react/24/outline";
import { useBookmarks } from "../../context/BookmarkContext";
import { BookmarkIcon as SolidBookmark } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import {
  bookmarkArticle,
  removeBookmark,
} from "../../services/userInteractionService";

const BookmarkButton = ({ articleId, initialCount = 0 }) => {
  const { bookmarkIds, setBookmarkIds } = useBookmarks();
  const [bookmarked, setBookmarked] = useState(bookmarkIds.includes(articleId));
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);
  useEffect(() => {
    setBookmarked(bookmarkIds.includes(articleId));
  }, [bookmarkIds, articleId]);
  const handleBookmark = async (e) => {
    e.stopPropagation();

    if (loading) return;

    setLoading(true);

    try {
      if (bookmarked) {
        await removeBookmark(articleId);

        setBookmarked(false);

        setBookmarkIds((prev) => prev.filter((id) => id !== articleId));

        setCount(res.data.data.bookmarks);

        toast.success("Bookmark removed");
      } else {
        const res = await bookmarkArticle(articleId);

        setBookmarked(true);

        setBookmarkIds((prev) => [...prev, articleId]);

        setCount(res.data.data.bookmarks);

        toast.success("Article bookmarked");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to update bookmark");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleBookmark}
      className="flex items-center gap-2 hover:text-blue-500 transition"
    >
      {bookmarked ? (
        <SolidBookmark className="w-6 h-6 text-blue-600" />
      ) : (
        <OutlineBookmark className="w-6 h-6" />
      )}

      {/* <span>{count}</span> */}
    </button>
  );
};

export default BookmarkButton;
