import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  const navigation = useNavigation();
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      const apiKey = "6d441409c1f847bb5a852d9c8edb5807"; // Replace with your OpenWeatherMap API key
      const city = "Dhaka";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getWeatherIcon = (weather) => {
    switch (weather) {
      case "Clouds":
        return "weather-cloudy";
      case "Rain":
        return "weather-rainy";
      case "Clear":
        return "weather-sunny";
      default:
        return "weather-cloudy";
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle="dark-content"
      />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Top Section with Background Image */}
        <View style={styles.topSection}>
          <Image
            source={require("../../assets/images/home_background.png")} // Your background image path
            style={styles.backgroundImage}
          />

          {/* Logo Positioned in Top-Left */}
          <Image
            source={require("../../assets/images/LOGO1.png")} // Your logo path
            style={styles.logo}
          />

          {/* Menu Icon Positioned in Top-Right */}
          <TouchableOpacity style={styles.menuIcon}>
            <Icon name="menu" size={30} color="#000" />
          </TouchableOpacity>

          {/* Weather Card */}
          <View style={styles.weatherCard}>
            <Icon
              name={
                weatherData
                  ? getWeatherIcon(weatherData.weather[0].main)
                  : "weather-cloudy"
              }
              size={50}
              color="#000"
            />
            <Text style={styles.temperature}>
              {weatherData ? `${Math.round(weatherData.main.temp)}°C` : "--°C"}
            </Text>
            <Text style={styles.weatherStatus}>
              {weatherData ? weatherData.weather[0].description : "Loading..."}
            </Text>
            <Text style={styles.locationText}>Mirpur, Dhaka</Text>
            <Text style={styles.dateText}>{new Date().toDateString()}</Text>
          </View>
        </View>

        {/* Need Solutions Title */}
        <Text style={styles.sectionTitle}>Need Solutions?</Text>

        {/* Services Section */}
        <View style={styles.solutionsContainer}>
          <TouchableOpacity style={styles.solutionCard}>
            <Image
              source={require("../../assets/images/water_resource_icon.png")}
              style={styles.solutionIcon}
            />
            <Text style={styles.solutionText}>Water Resource</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.solutionCard}>
            <Image
              source={require("../../assets/images/soil_quality_testing_icon.png")}
              style={styles.solutionIcon}
            />
            <Text style={styles.solutionText}>Soil Quality Testing</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.solutionCard}>
            <Image
              source={require("../../assets/images/crop_suggestion_icon.png")}
              style={styles.solutionIcon}
            />
            <Text style={styles.solutionText}>Crop Suggestion</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.solutionCard}
            onPress={() => navigation.navigate("DiseaseClassification")}
          >
            <Image
              source={require("../../assets/images/disease_classification_icon.png")}
              style={styles.solutionIcon}
            />
            <Text style={styles.solutionText}>Disease Classification</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.solutionCard}
            onPress={() => navigation.navigate("MarketplaceScreen")}
          >
            <Image
              source={require("../../assets/images/marketplace_icon.png")}
              style={styles.solutionIcon}
            />
            <Text style={styles.solutionText}>Marketplace</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.solutionCard}
            onPress={() => navigation.navigate("ChatbotScreen")}
          >
            <Image
              source={require("../../assets/images/chatbot_icon.png")}
              style={styles.solutionIcon}
            />
            <Text style={styles.solutionText}>ChatBot 'Dhrubo'</Text>
          </TouchableOpacity>
        </View>

        {/* Footer Section */}
        <Text style={styles.footerText}>A Solution from 'Team Dhrubotara'</Text>

        <View style={styles.footerIcons}>
          <TouchableOpacity>
            <Icon name="home" size={40} color="#4CAF50" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="weather-cloudy" size={40} color="#4CAF50" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5fff4",
    alignItems: "center",
  },
  topSection: {
    width: "100%",
    height: height * 0.4, // Adjust the height based on design
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    position: "absolute",
    top: 40,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  logo: {
    position: "absolute",
    top: -35,
    left: -15,
    width: 200, // Adjusted logo size
    height: 200, // Adjusted height to match the new size
    resizeMode: "contain",
  },
  menuIcon: {
    position: "absolute",
    top: 45,
    right: 20,
  },
  weatherCard: {
    backgroundColor: "#aeeaac",
    padding: 10,
    borderRadius: 20, // Rounded corners to match design
    borderWidth: 2, // Added border
    borderColor: "#87a25d", // Border color set to black
    width: width * 0.45, // Increased width
    height: height * 0.218,
    alignItems: "center",
    position: "absolute",
    right: 10, // Positioned to the right as per your design
    bottom: height * 0.07, // Adjust bottom margin as needed
  },
  temperature: {
    fontSize: 30, // Increased font size
    fontWeight: "bold",
    color: "#123514",
  },
  weatherStatus: {
    fontSize: 15, // Increased font size for weather description
    textTransform: "capitalize",
    color: "#123514",
    marginBottom: 5,
  },
  locationText: {
    fontSize: 12,
    // right:30,
    fontWeight: "bold",
    color: "#193d1b",
  },
  dateText: {
    fontSize: 12,
    // right:30,
    color: "#538153",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: -40,
    marginBottom: 45,
    color: "#FFF",
  },
  solutionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 10,
  },
  solutionCard: {
    backgroundColor: "#aeeaac",
    borderRadius: 5,
    width: "48%",
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  solutionIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  solutionText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#123513",
  },
  footerText: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
    color: "#000",
  },
  footerIcons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "50%",
    marginBottom: 0,
  },
});

export default HomeScreen;
