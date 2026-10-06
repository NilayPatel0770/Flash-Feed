import { createContext, useContext, useEffect, useState } from "react";
import { getLikedArticles } from "../services/likedService";

const LikedContext = createContext();

export const LikedProvider = ({ children }) => {

    const [likedIds, setLikedIds] = useState([]);

    const loadLikedArticles = async () => {

        try {

            const res = await getLikedArticles();

            setLikedIds(
                res.data.data.map(article => article._id)
            );

        } catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {

        loadLikedArticles();

    }, []);

    return (

        <LikedContext.Provider
            value={{
                likedIds,
                setLikedIds,
                refreshLikedArticles: loadLikedArticles
            }}
        >

            {children}

        </LikedContext.Provider>

    );

};

export const useLiked = () => useContext(LikedContext);