import axios from 'axios';

// API method to get skills for a class
export const getClassSkills = async (className) => {
  try {
    // Sending a GET request to the API with the class name as a parameter
    const response = await axios.get(`/api/characters/skill/${className}`);

    // Return the data received from the API
    return response.data;
  } catch (error) {
    // Handle any errors here
    console.error("Error fetching class skills:", error);
    throw error;
  }
};
