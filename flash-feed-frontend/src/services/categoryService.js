import API from "../api/api";

export const getCategories = async () => {
    return await API.get("/api/categories");
};