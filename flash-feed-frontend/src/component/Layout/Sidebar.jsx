import {
  ArrowRightStartOnRectangleIcon,
  ChevronLeftIcon,
  HomeIcon,
  BookmarkIcon,
  UserIcon,
  ClockIcon,
  HeartIcon,
  FireIcon,
} from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import useCategories from "../../hooks/useCategories";

const Sidebar = ({ isSidebarOpen, onCloseSidebar }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const { categories, loading } = useCategories();
  const [searchParams] = useSearchParams();
    useEffect(() => {
  if (isSidebarOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [isSidebarOpen]);
  const currentCategory = searchParams.get("category") || "all";
  const handleCategoryClick = (category) => {
    const params = new URLSearchParams(searchParams);

    if (category.slug === "all") {
      params.delete("category");
    } else {
      params.set("category", category.slug);
    }

    navigate(`/home?${params.toString()}`);

    onCloseSidebar();
  };
  return (
    // sidebar started
   <div
    className={`fixed top-0 left-0 h-screen w-64 bg-slate-900 text-white shadow-2xl z-[100] border-r border-slate-800
    transition-transform duration-300 ease-in-out
    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
  >
      {/* Your sidebar content */}
      <div className="flex flex-col h-full justify-between overflow-y-auto">
        <div className="p-2">
          <div className="flex items-center my-3 px-2 gap-2">
            <ChevronLeftIcon
              className="text-slate-300 hover:text-white h-7 w-7 cursor-pointer transition"
              onClick={onCloseSidebar}
            />
            <span className="text-slate-200 font-medium">Back to Home</span>
          </div>
          <div className="mt-4 space-y-1">
            <button
              onClick={() => {
                navigate("/home");
                onCloseSidebar();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-200 hover:bg-slate-800 hover:text-white transition"
            >
              <HomeIcon className="h-5 w-5 text-blue-400" />
              Home
            </button>

            <button
              onClick={() => {
                navigate("/trending");
                onCloseSidebar();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-200 hover:bg-slate-800 hover:text-white transition"
            >
              <FireIcon className="w-5 h-5 text-amber-400" />
              Trending
            </button>

            <button
              onClick={() => {
                navigate("/saved-news");
                onCloseSidebar();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-200 hover:bg-slate-800 hover:text-white transition"
            >
              <BookmarkIcon className="h-5 w-5 text-indigo-400" />
              Saved News
            </button>

            <button
              onClick={() => {
                navigate("/history");
                onCloseSidebar();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-200 hover:bg-slate-800 hover:text-white transition"
            >
              <ClockIcon className="w-5 h-5 text-emerald-400" />
              Reading History
            </button>

            <button
              onClick={() => {
                navigate("/liked");
                onCloseSidebar();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-200 hover:bg-slate-800 hover:text-white transition"
            >
              <HeartIcon className="w-5 h-5 text-rose-400" />
              Liked Articles
            </button>

            <button
              onClick={() => {
                navigate("/profile");
                onCloseSidebar();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-200 hover:bg-slate-800 hover:text-white transition"
            >
              <UserIcon className="h-5 w-5 text-cyan-400" />
              Profile
            </button>
          </div>

          <div className="border-t border-slate-800 my-4"></div>

          <h2 className="text-xs uppercase tracking-wider font-semibold text-slate-400 px-4 mb-2">
            Categories
          </h2>
          {/* news categories */}
          <ul className="space-y-1">
            {categories.map((category) => (
              <li
                key={category.slug}
                onClick={() => handleCategoryClick(category)}
                className={`cursor-pointer px-4 py-2.5 rounded-xl transition text-sm font-medium
                ${
                  currentCategory === category.slug
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }
            `}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>
        {/* for logout button */}
        <div
          className="flex items-center px-6 py-4 border-t border-slate-800 cursor-pointer text-slate-400 hover:text-rose-400 hover:bg-slate-800/60 transition"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
          <span className="ps-3 text-sm font-medium">Logout</span>
        </div>
      </div>
    </div>
    // sidebar end
  );
};

export default Sidebar;
