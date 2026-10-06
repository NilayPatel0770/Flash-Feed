import API from "../api/api";

export const loginUser = async (data) => {
    return await API.post("/api/auth/login", data);
};

export const registerUser = async (data) => {
    return await API.post("/api/auth/register", data);
};

export const getProfile = async () => {
    return await API.get("/api/auth/profile");
};