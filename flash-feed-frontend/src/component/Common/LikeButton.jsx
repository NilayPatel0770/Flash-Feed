import { useEffect, useState } from "react";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { useLiked } from "../../context/LikedContext";
import {
  likeArticle,
  unlikeArticle,
} from "../../services/userInteractionService";

const LikeButton = ({
  articleId,
    initialCount = 0,
    showCount = true
}) => {
  const { likedIds, setLikedIds } = useLiked();
  const [liked, setLiked] = useState(likedIds.includes(articleId));
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLiked(likedIds.includes(articleId));
  }, [likedIds, articleId]);
  useEffect(() => {
    setCount(initialCount);
}, [initialCount]);
  const handleLike = async (e) => {
    e.stopPropagation();

    if (loading) return;

    setLoading(true);

    try {
      if (liked) {
        await unlikeArticle(articleId);

        setLiked(false);

        setCount((prev) => Math.max(prev - 1, 0));

        setLikedIds((prev) => prev.filter((id) => id !== articleId));

        toast.success("Like removed");
      } else {
        await likeArticle(articleId);

        setLiked(true);

        setCount((prev) => prev + 1);

        setLikedIds((prev) => [...prev, articleId]);

        toast.success("Article liked");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to update like");
    } finally {
      setLoading(false);
    }
  };

  return (
   <button
  onClick={handleLike}
  className="flex items-center gap-2 text-main-text hover:text-red-500 transition"
>
  {liked ? (
    <SolidHeart className="w-6 h-6 text-red-500" />
  ) : (
    <OutlineHeart className="w-6 h-6" />
  )}

  {/* {showCount && <span>{count}</span>} */}
</button>
  );
};

export default LikeButton;
