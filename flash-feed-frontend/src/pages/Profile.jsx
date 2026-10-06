import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  UserCircleIcon,
  BookmarkIcon,
  HeartIcon,
  ClockIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Profile Card */}

      <div className="bg-card rounded-2xl shadow-lg p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <UserCircleIcon className="w-28 h-28 text-blue-500" />

          <div className="flex-1">
            <h1 className="text-4xl font-bold text-main-text">{user.name}</h1>

            <p className="text-muted-text mt-2">{user.email}</p>

            <span className="inline-block mt-4 px-4 py-1 rounded-full bg-blue-100 text-blue-700">
              {user.role}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}

      <div className="grid md:grid-cols-3 gap-6 mt-10">
        <div
          onClick={() => navigate("/saved-news")}
          className="bg-card rounded-xl shadow p-6 cursor-pointer hover:shadow-xl transition"
        >
          <BookmarkIcon className="w-8 h-8 text-blue-600" />

          <h2 className="mt-4 text-xl font-semibold text-main-text">
            Saved Articles
          </h2>

          <p className="text-muted-text">View your bookmarks</p>
        </div>

        <div
          onClick={() => navigate("/history")}
          className="bg-card rounded-xl shadow p-6 cursor-pointer hover:shadow-xl transition"
        >
          <ClockIcon className="w-8 h-8 text-green-600" />

          <h2 className="mt-4 text-xl font-semibold text-main-text">
            Reading History
          </h2>

          <p className="text-muted-text">Articles you've read</p>
        </div>

        <div
          onClick={() => navigate("/liked")}
          className="bg-card rounded-xl shadow p-6 cursor-pointer hover:shadow-xl transition"
        >
          <HeartIcon className="w-8 h-8 text-red-500" />

          <h2 className="mt-4 text-xl font-semibold text-main-text">
            Liked Articles
          </h2>

          <p className="text-muted-text">Your liked news</p>
        </div>
      </div>

      {/* Logout */}

      <div className="mt-12">
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl transition"
        >
          <ArrowRightStartOnRectangleIcon className="w-6 h-6" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
