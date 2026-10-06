import React, { useState, useEffect } from "react";
import ThemeSwitcher from "../UI/ThemeSwitcher";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Button from "../UI/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Header = ({ handleSidebarToggle }) => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);
  /**
   * for opening the sidebar
   */
  const handleMenu = () => {
    handleSidebarToggle();
  };
  useEffect(() => {
    const currentParam = (searchParams.get("search") || "").trim();
    if (search.trim() === currentParam) {
      return;
    }

    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      if (search.trim()) {
        params.set("search", search.trim());
      } else {
        params.delete("search");
      }

      navigate(`/home?${params.toString()}`, {
        replace: true,
      });
    }, 400); // waits 400ms after typing stops

    return () => clearTimeout(timer);
  }, [search]);
  return (
    <div className="sticky top-0 z-50 grid grid-cols-3 p-3 bg-main-bg text-main-text shadow items-center transition-colors duration-300">
      <div className="flex items-center">
        <label htmlFor="toggle-sidebar">
          <Bars3Icon
            className="h-5 md:h-8 px-3 md:px-5 text-main-text cursor-pointer hover:opacity-80 transition"
            onClick={handleMenu}
          />
        </label>

        <div className="hidden md:flex border border-slate-300 dark:border-slate-700 bg-slate-100/60 dark:bg-slate-800/60 rounded-full px-6 py-2 ms-5 items-center transition-colors">
          <input
            type="text"
            placeholder="Search News..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="outline-none bg-transparent w-full text-main-text placeholder:text-muted-text"
          />
          <label htmlFor="search">
            <MagnifyingGlassIcon className="h-5 text-muted-text" />
          </label>
        </div>
      </div>

      <div className="text-center">
        <h1 className="text-lg md:text-3xl font-normal font-serif">
          Flash Feed
        </h1>
      </div>

      <div className="flex justify-end items-center gap-3">
        {/* Desktop Sign-In Button */}
        <div className="hidden md:block">
          {!isAuthenticated ? (
            <Button text="Sign In" onClick={() => navigate("/login")} />
          ) : (
            <button
              onClick={() => navigate("/profile")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                className="w-9 h-9 rounded-full"
              />

              <span className="text-main-text">{user.name}</span>
            </button>
          )}
        </div>

        {/* Mobile Sign-In Icon */}
        <div className="md:hidden cursor-pointer">
          <div
            onClick={() =>
              isAuthenticated ? navigate("/profile") : navigate("/login")
            }
          >
            <UserIcon className="h-6 cursor-pointer text-main-text" />
          </div>
        </div>

        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Header;
