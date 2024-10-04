import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import PostCard from './PostCard'; // Assuming PostCard is converted for mobile
import dummyPosts from './dummyPosts'; // You can store dummy posts locally or fetch them from an API

export default function MyPosts() {
  const userPosts = dummyPosts.filter((post) => post.isUser);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Posts</Text>
      {userPosts.length > 0 ? (
        <FlatList
          data={userPosts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <PostCard post={item} />}
        />
      ) : (
        <Text style={styles.noPostsText}>You have not created any posts yet.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  noPostsText: {
    fontSize: 16,
    color: '#666',
  },
});
