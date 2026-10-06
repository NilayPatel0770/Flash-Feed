import { HeartIcon } from "@heroicons/react/24/outline";
import React from "react";

const ManageLike = () => {
  return (
    <div className="flex flex-col items-center me-2 text-main-text">
      <HeartIcon className="block h-4 w-4 mb-1 text-red-500" />
      <p className="text-xs text-muted-text">
        <span>20</span>
      </p>
    </div>
  );
};

export default ManageLike;