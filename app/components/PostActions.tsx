import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { createPost, updatePost, deletePost } from "../api/postApi";

export default function PostActions() {
  // States for managing form data and actions
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [postId, setPostId] = useState<number | null>(null); // For updating or deleting
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreatePost = async () => {
    setLoading(true);
    setError(null);
    try {
      const newPost = { title, body };
      const createdPost = await createPost(newPost);
      setTitle(""); // Reset form
      setBody("");
      alert("Post created successfully!");
      console.log(createdPost); // You can use this data as per your requirements
    } catch (err: any) {
      setError("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePost = async () => {
    if (postId === null) {
      setError("Please provide a valid post ID to update.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const updatedPost = { title, body };
      const result = await updatePost(postId, updatedPost);
      setTitle(""); // Reset form
      setBody("");
      setPostId(null);
      alert("Post updated successfully!");
      console.log(result); // Log or handle the updated post as needed
    } catch (err: any) {
      setError("Failed to update post");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async () => {
    if (postId === null) {
      setError("Please provide a valid post ID to delete.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await deletePost(postId);
      setPostId(null);
      alert("Post deleted successfully!");
    } catch (err: any) {
      setError("Failed to delete post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Post Actions</Text>

      <TextInput
        style={styles.input}
        placeholder="Post Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Post Body"
        value={body}
        onChangeText={setBody}
      />
      <TextInput
        style={styles.input}
        placeholder="Post ID (for update or delete)"
        keyboardType="numeric"
        value={postId !== null ? postId.toString() : ""}
        onChangeText={(text) => setPostId(Number(text))}
      />

      <Button
        title="Create Post"
        onPress={handleCreatePost}
        disabled={loading}
      />
      <Button
        title="Update Post"
        onPress={handleUpdatePost}
        disabled={loading || postId === null}
      />
      <Button
        title="Delete Post"
        onPress={handleDeletePost}
        disabled={loading || postId === null}
      />

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center"
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20
  },
  input: {
    width: "100%",
    padding: 10,
    marginVertical: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5
  },
  error: {
    color: "red",
    marginTop: 10
  }
});
