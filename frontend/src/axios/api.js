import axios from "axios";

const baseURL = "http://localhost:4000/public/blog/category/UX-UI";

const api = axios.create({
  baseURL,
});

export const getImagesByCategory = async (category) => {
  try {
    const response = await api.get(category);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getImagesByCategory;
