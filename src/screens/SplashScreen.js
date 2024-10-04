import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const animation = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 2000, // 2 seconds for the loading bar
      useNativeDriver: false,
    }).start(() => {
      // Navigate to the next screen after animation completes
      navigation.replace('LoginScreen'); // Adjust to your next screen
    });
  }, []);

  const width = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'], // Loading bar animation
  });

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/Background.png')} // Your background image
        style={styles.backgroundImage}
      />
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/LOGO.png')} // Your logo image
          style={styles.logo}
        />
        <View style={styles.progressBar}>
          <Animated.View style={[styles.progress, { width }]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // Background color to match design
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Make sure the background image covers the entire screen
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200, // Adjust the size to match the design
    height: 200, // Ensure it matches the image ratio
    resizeMode: 'contain',
    marginBottom: 10,
  },
  progressBar: {
    width: 200,
    height: 7, // Match the design for the loading bar
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#4CAF50', // Match the design's green color
  },
});

export default SplashScreen;
