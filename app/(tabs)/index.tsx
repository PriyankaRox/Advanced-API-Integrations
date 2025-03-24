import { Image, StyleSheet, Platform, SafeAreaView } from "react-native";
import PostList from "../components/PostList";
import PostActions from "../components/PostActions";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <PostList />
      <PostActions />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8
  }
});
