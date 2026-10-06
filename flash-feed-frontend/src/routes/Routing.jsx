import { Navigate, Route, Routes } from "react-router-dom";
import Master from "../component/Layout/Master";
import Home from "../pages/Home";
import SavedNews from "../pages/SavedNews";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "../pages/Profile";
import Article from "../pages/Article";
import ReadingHistory from "../pages/ReadingHistory";
import LikedArticles from "../pages/LikedArticles";
import Trending from "../pages/Trending";

const Routing = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected/Main Layout */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Master />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/home" />} />
        <Route path="home" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="saved-news" element={<SavedNews />} />
        <Route path="article/:id" element={<Article />} />
        <Route path="/history" element={<ReadingHistory />} />
        <Route path="/liked" element={<LikedArticles />} />
        <Route path="/trending" element={<Trending />} />
      </Route>
    </Routes>
  );
};

export default Routing;
