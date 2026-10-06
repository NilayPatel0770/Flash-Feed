import { BookmarkIcon } from "@heroicons/react/24/outline";
import React from "react";

const SaveForLater = () => {
  return (
    /* Added 'shrink-0' to prevent the circle from squishing.
       Changed bg-white to bg-inv-bg and text-black to text-inv-text 
       so it flips correctly with the theme.
    */
    <div className="flex items-center justify-center w-10 h-10 rounded-full shadow-md shrink-0 bg-inv-bg transition-colors duration-300">
      <BookmarkIcon className="block h-5 w-5 text-inv-text" />
    </div>
  );
};

export default SaveForLater;