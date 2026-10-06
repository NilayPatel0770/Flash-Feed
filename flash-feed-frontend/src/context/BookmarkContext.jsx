import { createContext, useContext, useEffect, useState } from "react";
import { getBookmarks } from "../services/userInteractionService";

const BookmarkContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [bookmarkIds, setBookmarkIds] = useState([]);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      const res = await getBookmarks();

      const ids = res.data.data.map((article) => article._id);

      setBookmarkIds(ids);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarkIds,
        setBookmarkIds,
        loadBookmarks,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => useContext(BookmarkContext);