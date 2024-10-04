import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

// Sample data for the charts
const sensorData = {
  nitrogen: 25,
  phosphorus: 18,
  potassium: 12,
  pH: 6.8,
  temperature: 22,
  moisture: 45,
  organicMatter: 5,
  soilTexture: {
    sand: 40,
    silt: 40,
    clay: 20,
  },
  cationExchangeCapacity: 15,
  electricalConductivity: 2.5,
};

// Sample historical data for LineChart
const historicalData = [
  { timestamp: '2024-09-01', nitrogen: 20, phosphorus: 15, potassium: 10 },
  { timestamp: '2024-09-02', nitrogen: 22, phosphorus: 16, potassium: 11 },
  { timestamp: '2024-09-03', nitrogen: 23, phosphorus: 17, potassium: 12 },
  { timestamp: '2024-09-04', nitrogen: 25, phosphorus: 18, potassium: 12 },
  { timestamp: '2024-09-05', nitrogen: 24, phosphorus: 17, potassium: 11 },
  { timestamp: '2024-09-06', nitrogen: 25, phosphorus: 18, potassium: 12 },
];

// Sample soil texture data for BarChart
const soilTextureData = [
  { name: 'Sand', percentage: sensorData.soilTexture.sand },
  { name: 'Silt', percentage: sensorData.soilTexture.silt },
  { name: 'Clay', percentage: sensorData.soilTexture.clay },
];

// Analysis function for soil condition
const analyzeSoilCondition = (data) => {
  let condition = '';
  const { nitrogen, phosphorus, potassium, pH, organicMatter, cationExchangeCapacity, electricalConductivity } = data;

  if (nitrogen < 20) condition += 'Nitrogen levels are low. ';
  else condition += 'Nitrogen levels are adequate. ';

  if (phosphorus < 15) condition += 'Phosphorus levels are low. ';
  else condition += 'Phosphorus levels are adequate. ';

  if (potassium < 10) condition += 'Potassium levels are low. ';
  else condition += 'Potassium levels are adequate. ';

  if (pH < 6.0) condition += 'Soil is acidic. ';
  else if (pH > 7.5) condition += 'Soil is alkaline. ';
  else condition += 'Soil pH is neutral. ';

  if (organicMatter < 3) condition += 'Organic matter content is low. ';
  else condition += 'Organic matter content is good. ';

  if (cationExchangeCapacity < 10) condition += 'Cation Exchange Capacity (CEC) is low. ';
  else condition += 'Cation Exchange Capacity (CEC) is adequate. ';

  if (electricalConductivity > 2) condition += 'Electrical Conductivity (EC) indicates high salinity. ';
  else condition += 'Electrical Conductivity (EC) is within normal range. ';

  return condition;
};

const SoilQualityTesting = () => {
  const soilCondition = analyzeSoilCondition(sensorData);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerSpace} />
      <Text style={styles.title}>Soil Quality Testing</Text>
      <Text style={styles.subtitle}>Comprehensive Analysis of Your Soil Health</Text>

      {/* Line Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Nutrient Levels Over Time</Text>
        <LineChart
          data={{
            labels: historicalData.map((item) => item.timestamp),
            datasets: [
              {
                data: historicalData.map((item) => item.nitrogen),
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                strokeWidth: 2,
              },
              {
                data: historicalData.map((item) => item.phosphorus),
                color: (opacity = 1) => `rgba(244, 67, 54, ${opacity})`,
                strokeWidth: 2,
              },
              {
                data: historicalData.map((item) => item.potassium),
                color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
                strokeWidth: 2,
              },
            ],
          }}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#f7fafc',
            backgroundGradientFrom: '#ffecd2',
            backgroundGradientTo: '#fcb69f',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>

      {/* Bar Chart for Soil Texture */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Soil Texture Composition</Text>
        <BarChart
          data={{
            labels: soilTextureData.map((item) => item.name),
            datasets: [
              {
                data: soilTextureData.map((item) => item.percentage),
              },
            ],
          }}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#f7fafc',
            backgroundGradientFrom: '#84fab0',
            backgroundGradientTo: '#8fd3f4',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 128, 128, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          verticalLabelRotation={30}
          style={styles.chart}
        />
      </View>

      {/* Soil Condition Analysis */}
      <View style={styles.analysisContainer}>
        <Text style={styles.analysisTitle}>Soil Condition:</Text>
        <Text style={styles.analysisText}>{soilCondition}</Text>
      </View>

      {/* Suggested Crops */}
      <View style={styles.suggestionContainer}>
        <Text style={styles.suggestionTitle}>Suggested Crops:</Text>
        <View style={styles.suggestionList}>
          <Text style={styles.suggestionItem}>Wheat</Text>
          <Text style={styles.suggestionItem}>Corn</Text>
          <Text style={styles.suggestionItem}>Soybean</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  headerSpace: {
    height: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#34495e',
  },
  chartContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: '#34495e',
  },
  chart: {
    borderRadius: 16,
  },
  analysisContainer: {
    marginBottom: 30,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  analysisTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#2c3e50',
  },
  analysisText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#34495e',
  },
  suggestionContainer: {
    marginBottom: 30,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  suggestionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#34495e',
  },
  suggestionList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  suggestionItem: {
    fontSize: 16,
    backgroundColor: '#27ae60',
    color: '#fff',
    padding: 10,
    borderRadius: 20,
    overflow: 'hidden',
    textAlign: 'center',
  },
});

export default SoilQualityTesting;
