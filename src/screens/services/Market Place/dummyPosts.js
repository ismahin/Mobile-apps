import 'react-native-get-random-values'; // Import this first
import { v4 as uuidv4 } from 'uuid'; // Then import uuid


const dummyPosts = Array.from({ length: 15 }, (_, index) => ({
  id: uuidv4(),
  image: 'https://via.placeholder.com/150', // Replace with actual image URLs if needed
  name: ['Wheat', 'Corn', 'Rice', 'Barley', 'Soybean'][index % 5],
  description: `High-quality ${['Wheat', 'Corn', 'Rice', 'Barley', 'Soybean'][index % 5]} available for sale.`,
  contactNumber: '123-456-7890',
  price: (Math.random() * 100).toFixed(2),
  unit: 'kg',
  isUser: index % 5 === 0,
}));

export default dummyPosts;
