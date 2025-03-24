import axiosInstance from "./axiosInstance";

// Fetch posts
export const fetchPosts = async () => {
  try {
    const response = await axiosInstance.get("/posts");
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Create a post
export const createPost = async (post) => {
  try {
    const response = await axiosInstance.post("/posts", post);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update a post
export const updatePost = async (id, post) => {
  try {
    const response = await axiosInstance.put(`/posts/${id}`, post);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete a post
export const deletePost = async (id) => {
  try {
    await axiosInstance.delete(`/posts/${id}`);
  } catch (error) {
    throw new Error(error.message);
  }
};
