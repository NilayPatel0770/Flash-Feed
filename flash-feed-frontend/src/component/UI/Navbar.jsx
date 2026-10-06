import React, { useState } from "react";
import { Link } from "react-router-dom";
import DropDown from "./DropDown";

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCategory = (index) => {
    setActiveIndex(index);
  };

  return (
    <>
      <div className="flex justify-end mb-2">
        {/* DropDown buttons displays for smaller size screens */}
        <DropDown />
      </div>
      {/* Start: Navbar */}
      {/* Navbar is hidden for smaller size screens */}
      <div className="hidden sm:block">
        <ul className="flex w-full justify-between border-b border-slate-200 dark:border-slate-800 text-main-text">
          {/*Start: Navbar category */}
          <li
            className={`cursor-pointer hover:font-semibold p-4 relative transition ${
              activeIndex === 0 ? "font-bold text-blue-600 dark:text-blue-400" : "text-muted-text"
            }`}
            onClick={() => activeCategory(0)}
          >
            <Link to="/home">For You</Link>
            {activeIndex === 0 && (
              <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-blue-600 rounded-full"></div>
            )}
          </li>

          <li
            className={`cursor-pointer hover:font-semibold p-4 relative transition ${
              activeIndex === 1 ? "font-bold text-blue-600 dark:text-blue-400" : "text-muted-text"
            }`}
            onClick={() => activeCategory(1)}
          >
            <Link to="/top-stories">Top Stories</Link>
            {activeIndex === 1 && (
              <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-blue-600 rounded-full"></div>
            )}
          </li>

          <li
            className={`cursor-pointer hover:font-semibold p-4 relative transition ${
              activeIndex === 2 ? "font-bold text-blue-600 dark:text-blue-400" : "text-muted-text"
            }`}
            onClick={() => activeCategory(2)}
          >
            <Link to="/trending">Trending</Link>
            {activeIndex === 2 && (
              <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-blue-600 rounded-full"></div>
            )}
          </li>

          <li
            className={`cursor-pointer hover:font-semibold p-4 relative transition ${
              activeIndex === 3 ? "font-bold text-blue-600 dark:text-blue-400" : "text-muted-text"
            }`}
            onClick={() => activeCategory(3)}
          >
            <Link to="/saved-news">Saved News</Link>
            {activeIndex === 3 && (
              <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-blue-600 rounded-full"></div>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;