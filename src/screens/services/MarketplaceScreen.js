import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import PostCard from './Market Place/PostCard'; // Assume PostCard is converted for mobile
import CreatePostModal from './Market Place/CreatePostModal'; // Assume CreatePostModal is converted for mobile
import dummyPosts from './Market Place/dummyPosts'; // You can store dummy posts as a local array or fetch them from an API

export default function MarketplaceScreen({ navigation }) {
  const [posts, setPosts] = useState(dummyPosts);
  const [showModal, setShowModal] = useState(false);

  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowModal(true)}
        >
          <Text style={styles.buttonText}>Create Post</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('MyPostsScreen')}
        >
          <Text style={styles.buttonText}>My Posts</Text>
        </TouchableOpacity>
      </View>

      <CreatePostModal
        showModal={showModal}
        setShowModal={setShowModal}
        addPost={addPost}
      />

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostCard post={item} />}
        contentContainerStyle={styles.postsGrid}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#388E3C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  postsGrid: {
    paddingBottom: 20,
  },
});
