import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

// Demo crop images
const cropImages = {
  Bell_Pepper: require('../../../assets/images/Bell_pepper.jpg'),
  Carrot: require('../../../assets/images/Carrot.jpg'),
  Wheat: require('../../../assets/images/Wheat.jpg'),
  Watermelon: require('../../../assets/images/Watermelon.jpg'),
  // Add the rest of your images here...
};

const demoSuggestions = [
  { name: 'Bell_Pepper', season: 'Summer' },
  { name: 'Carrot', season: 'Winter' },
  { name: 'Wheat', season: 'Winter' },
];

const CropSuggestionScreen = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const suggestionsRef = useRef(null);

  const handleDateChange = (event, selectedDate, isStartDate) => {
    const currentDate = selectedDate || (isStartDate ? startDate : endDate);
    isStartDate ? setStartDate(currentDate) : setEndDate(currentDate);
    isStartDate ? setShowStartPicker(false) : setShowEndPicker(false);
  };

  const handleGetSuggestions = () => {
    setSuggestions(demoSuggestions);
    if (suggestionsRef.current) {
      suggestionsRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} ref={suggestionsRef}>
      <View style={styles.heroSection}>
        <Text style={styles.title}>Crop Suggestion Service</Text>
        <Text style={styles.description}>
          Get personalized crop suggestions based on your planting schedule.
        </Text>

        {/* Display selected start date */}
        <Text style={styles.dateText}>Start Date: {startDate.toDateString()}</Text>
        <TouchableOpacity style={styles.button} onPress={() => setShowStartPicker(true)}>
          <Text style={styles.buttonText}>Select Start Date</Text>
        </TouchableOpacity>
        {showStartPicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={(e, date) => handleDateChange(e, date, true)}
          />
        )}

        {/* Display selected end date */}
        <Text style={styles.dateText}>End Date: {endDate.toDateString()}</Text>
        <TouchableOpacity style={styles.button} onPress={() => setShowEndPicker(true)}>
          <Text style={styles.buttonText}>Select End Date</Text>
        </TouchableOpacity>
        {showEndPicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={(e, date) => handleDateChange(e, date, false)}
          />
        )}

        <TouchableOpacity style={styles.suggestButton} onPress={handleGetSuggestions}>
          <Text style={styles.suggestButtonText}>Get Suggestions</Text>
        </TouchableOpacity>
      </View>

      {/* Crop suggestions */}
      <View style={styles.suggestionsContainer}>
        {suggestions.map((crop, index) => (
          <View key={index} style={styles.cropCard}>
            <Image
              source={cropImages[crop.name]}
              style={styles.cropImage}
            />
            <Text style={styles.cropName}>{crop.name}</Text>
            <Text>Season: {crop.season}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  heroSection: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#27ae60',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  suggestButton: {
    backgroundColor: '#2980b9',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  suggestButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  suggestionsContainer: {
    marginTop: 20,
    width: '100%',
  },
  cropCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  cropImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  cropName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default CropSuggestionScreen;
