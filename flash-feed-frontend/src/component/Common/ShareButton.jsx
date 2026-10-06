import { ShareIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

const ShareButton = ({ article }) => {

  const shareUrl =
    `${window.location.origin}/article/${article._id}`;

  const handleShare = async (e) => {

    e.stopPropagation();

    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.description,
          url: shareUrl,
        });
      } catch (err) {
        console.log(err);
      }

      return;
    }

    await navigator.clipboard.writeText(shareUrl);

    toast.success("Article link copied!");
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 hover:text-blue-500 transition"
    >
      <ShareIcon className="w-6 h-6" />

      <span>Share</span>
    </button>
  );
};

export default ShareButton;