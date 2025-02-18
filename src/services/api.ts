import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export const fetchUsers = async (page: number, search: string) => {
  const response = await axios.get(`${API_BASE_URL}/users`, {
    params: { page, limit: 5, search },
  });
  return response.data;
};
