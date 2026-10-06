import API from "../api/api";

export const testConnection = async () => {
  const response = await API.get("/");
  return response.data;
};