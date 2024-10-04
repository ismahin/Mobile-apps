import React, { useState } from 'react';
import { View, Text, TextInput, Modal, Button, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { v4 as uuidv4 } from 'uuid';

export default function CreatePostModal({ showModal, setShowModal, addPost }) {
  const [formData, setFormData] = useState({
    id: uuidv4(),
    image: '',
    name: '',
    description: '',
    contactNumber: '',
    price: '',
    unit: '',
  });

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleImageChange = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setFormData({ ...formData, image: result.uri });
    }
  };

  const handleSubmit = () => {
    if (formData.name && formData.description && formData.contactNumber && formData.price && formData.unit) {
      addPost({ ...formData, id: uuidv4() });
      setFormData({
        id: uuidv4(),
        image: '',
        name: '',
        description: '',
        contactNumber: '',
        price: '',
        unit: '',
      });
      setShowModal(false);
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <Modal visible={showModal} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Create Post</Text>

          <TouchableOpacity onPress={handleImageChange} style={styles.imagePicker}>
            {formData.image ? (
              <Image source={{ uri: formData.image }} style={styles.imagePreview} />
            ) : (
              <Text>Select Image</Text>
            )}
          </TouchableOpacity>

          <TextInput
            placeholder="Crop Name"
            style={styles.input}
            value={formData.name}
            onChangeText={(text) => handleChange('name', text)}
          />
          <TextInput
            placeholder="Description"
            style={styles.input}
            value={formData.description}
            onChangeText={(text) => handleChange('description', text)}
            multiline
          />
          <TextInput
            placeholder="Contact Number"
            style={styles.input}
            value={formData.contactNumber}
            onChangeText={(text) => handleChange('contactNumber', text)}
          />
          <TextInput
            placeholder="Price"
            style={styles.input}
            value={formData.price}
            onChangeText={(text) => handleChange('price', text)}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Unit (e.g., kg, ton)"
            style={styles.input}
            value={formData.unit}
            onChangeText={(text) => handleChange('unit', text)}
          />

          <View style={styles.buttonGroup}>
            <Button title="Cancel" onPress={() => setShowModal(false)} />
            <Button title="Post" onPress={handleSubmit} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
  },
  imagePicker: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
