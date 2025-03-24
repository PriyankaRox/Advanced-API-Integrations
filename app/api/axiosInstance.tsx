import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json"
  }
});

export default axiosInstance;

// export const createPost = async (post) => {
//   const response = await axiosInstance.post("/posts", post);
//   return response.data;
// };

// export const updatePost = async (id, updates) => {
//   const resposne = await axiosInstance.put(`/posts/${id}`, updates);
//   return resposne.data;
// };

// export const deletePost = async (id) => {
//   await axiosInstance.delete(`/posts/${id}`);
// };

//Retry Failed Requests
// import axiosRetry from 'axios-retry';

// axiosRetry(axiosInstance, {
//   retries: 3, // Retry failed requests up to 3 times
//   retryDelay: (retryCount) => retryCount * 1000,
// });

//Cache API Responses
// import { setupCache } from 'axios-cache-adapter';

// const cache = setupCache({
//   maxAge: 15 * 60 * 1000, // Cache for 15 minutes
// });

// const axiosInstance = axios.create({
//   adapter: cache.adapter,
//   baseURL: 'https://jsonplaceholder.typicode.com',
// });

//Categorize and Log Errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (response) {
      switch (response.status) {
        case 400:
          console.error("Bad Request:", response.data);
          break;
        case 401:
          console.error("Unauthorized:", response.data);
          break;
        case 403:
          console.error("Forbidden:", response.data);
          break;
        case 404:
          console.error("Not Found:", response.data);
          break;
        case 500:
          console.error("Internal Server Error:", response.data);
          break;
        default:
          console.error("Unexpected Error:", response.data);
      }
    }
    return Promise.reject(error);
  }
);
