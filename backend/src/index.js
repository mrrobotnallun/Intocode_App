const express = require("express");
const bodyParser = require("body-parser");
const dummyRecipes = require("./recipes.json");
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// In-memory storage for recipes
let recipes = [...dummyRecipes];

// Middleware to enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// GET route for all recipes
app.get("/recipes", (_, res) => {
  res.json(recipes);
});

// GET route for a single recipe
app.get("/recipes/:id", (req, res) => {
  const id = req.params.id;
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    res.status(404).json({ error: "Recipe not found" });
  } else {
    res.json(recipe);
  }
});

// POST route for new recipes
app.post("/recipes", (req, res) => {
  const newRecipe = req.body;

  const highestId = recipes.reduce((acc, curr) => {
    const currentId = parseInt(curr.id);
    if (currentId > acc) {
      return currentId;
    } else {
      return acc;
    }
  }, 0);

  newRecipe.id = (highestId + 1).toString();
  newRecipe.isFavorite = false;

  recipes.push(newRecipe);
  res.json(newRecipe);
});

// PUT route to update recipes
app.put("/recipes/:id", (req, res) => {
  const id = req.params.id;
  const updatedRecipeIndex = recipes.findIndex((r) => r.id === id);

  if (updatedRecipeIndex === -1) {
    res.status(404).json({ error: "Recipe not found" });
  } else {
    const updatedRecipe = req.body;
    updatedRecipe.id = id;
    recipes[updatedRecipeIndex] = updatedRecipe;
    res.json(updatedRecipe);
  }
});

// PUT route to update a recipe's favorite status
app.put("/recipes/:id/favorite", (req, res) => {
  const id = req.params.id;
  const updatedRecipeIndex = recipes.findIndex((r) => r.id === id);

  if (updatedRecipeIndex === -1) {
    res.status(404).json({ error: "Recipe not found" });
  } else {
    const updatedRecipe = recipes[updatedRecipeIndex];
    updatedRecipe.isFavorite = !updatedRecipe.isFavorite;
    res.json(updatedRecipe);
  }
});

app.delete("/recipes/:id", (req, res) => {
  const id = req.params.id;
  const deletedRecipeIndex = recipes.findIndex((r) => r.id === id);

  if (deletedRecipeIndex === -1) {
    res.status(404).json({ error: "Recipe not found" });
  } else {
    recipes.splice(deletedRecipeIndex, 1);
    res.status(204).json({ message: "Recipe deleted" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} 🥳`);
});
