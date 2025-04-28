const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware setup
app.use(cors());  // Allow cross-origin requests
app.use(express.json());  // Parse JSON bodies

// Define the recipe API endpoint
app.post('/api/recipes', async (req, res) => {
  const { ingredients } = req.body; // Destructure ingredients from the request body

  if (!ingredients || ingredients.length === 0) {
    return res.status(400).send('Ingredients are required');
  }

  try {
    // Replace with your actual Spoonacular API key
    const response = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
      params: {
        ingredients: ingredients.join(','),
        number: 5,
        apiKey: '00e1ef32ed0943d49599e419e2febe9c', // Put your Spoonacular API key here
      },
    });

    res.json(response.data); // Send back the recipes data
  } catch (error) {
    console.error('Error fetching recipes', error);
    res.status(500).send('Error fetching recipes');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
