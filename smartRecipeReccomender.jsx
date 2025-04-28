import React, { useState } from "react";
import axios from "axios";
import "./styles.css"; // Import the custom styles

export default function SmartRecipeRecommender() {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/recipes", {
        ingredients: ingredients.split(",").map((i) => i.trim()),
      });
  
      console.log("🔍 API response:", response.data); // Add this line
      setRecipes(response.data);
    } catch (err) {
      console.error("Error fetching recipes", err);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="container">
      <h1>🍳 Smart Recipe Recommender</h1>
      <div className="mb-4">
        
        <label className="block mb-2 text-lg">
          Enter ingredients (comma separated):
        </label>
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="input"
          placeholder="e.g., eggs, tomato, cheese"
        />
      </div>
      <button onClick={handleSearch}>
        {loading ? "Searching..." : "Suggest Recipes"}
      </button>

      <div className="results">
        {recipes.length > 0 && (
          <>
            <h2>Results:</h2>
            <ul>
  {recipes.map((recipe, index) => (
    <li key={index} className="result-item">
      <h3>{recipe.title}</h3> {/* not recipe.name */}
      {recipe.image && <img src={recipe.image} alt={recipe.title} style={{ width: '100px' }} />}
    </li>
  ))}
</ul>

          </>
        )}
      </div>
    </div>
  );
}
