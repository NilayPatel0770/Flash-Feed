import API from "../api/api";

export const getArticle = async (id) => {

    return await API.get(`/api/news/${id}`);

};