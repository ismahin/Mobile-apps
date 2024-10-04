import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const LoginScreen = () => {
  const navigation = useNavigation();
  const [countryCode, setCountryCode] = useState("BD");
  const [callingCode, setCallingCode] = useState("880");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [visible, setVisible] = useState(false);

  const onSelect = (country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/Background.png")} // Background image path
        style={styles.backgroundImage}
      />

      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/LOGO.png")} // Logo image path
          style={styles.logo}
        />
      </View>

      <View style={styles.inputContainer}>
        <CountryPicker
          countryCode={countryCode}
          withFilter
          withFlag
          withCallingCode
          withEmoji
          onSelect={onSelect}
          visible={visible}
          onOpen={() => setVisible(true)}
        />
        <Text style={styles.countryCode}>+{callingCode}</Text>
        <TextInput
          style={styles.phoneNumberInput}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      <TouchableOpacity style={styles.nextButton}
      onPress={() => navigation.navigate('HomeScreen')}>
        <Text style={styles.nextButtonText}>Next &#187;&#187;&#187;</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or</Text>

      <View style={styles.socialLoginContainer}>
        <TouchableOpacity>
          <Image
            source={require("../../assets/images/facebook-icon.png")} // Facebook icon image path
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../../assets/images/google-icon.png")} // Google icon image path
            style={styles.socialIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  logoContainer: {
    marginTop: height * 0.2, // Adjust the top margin based on the screen height
    alignItems: "center",
  },
  logo: {
    width: width * 0.7, // 50% of the screen width
    height: width * 0.7, // Adjust height to maintain aspect ratio
    resizeMode: "contain",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#388E3C",
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 20,
    marginTop: 5,
    width: "70%",
    height: 60, // Adjust the height of the input field to match the design
  },
  countryCode: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#388E3C",
    marginRight: 10,
  },
  phoneNumberInput: {
    fontSize: 18,
    flex: 1,
    color: "#388E3C", // Adjust text color to match the design
  },
  nextButton: {
    backgroundColor: "#388E3C",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 60,
    marginBottom: 30,
    width: "60%", // Adjust the width of the button to match the design
    alignItems: "center",
  },
  nextButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  orText: {
    fontSize: 16,
    color: "#888888",
    marginBottom: 20,
  },
  socialLoginContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "40%",
    marginBottom: height * 0.05, // Adjust margin based on screen height
  },
  socialIcon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});

export default LoginScreen;
