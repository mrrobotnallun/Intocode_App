import React, { createContext, useState, useEffect } from "react";
import {
  fetchRecipes,
  toggleFavorite,
  deleteRecipe,
  addRecipe,
  fetchRecipeById,
} from "./api";

export const RecipesContext = createContext();

export const RecipesProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // Funktionen zum Abrufen alle Rezepte
  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const fetchedRecipes = await fetchRecipes();
        setRecipes(fetchedRecipes);
      } catch (error) {
        console.error("Fehler beim Laden der Rezepte:", error);
      }
    };
    loadRecipes();
  }, []);


  
  // Funktionen zum Delete einen Rezept
  const handleDeleteRecipe = async (id) => {
    try {
      await deleteRecipe(id); // Löscht das Rezept
      setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== id)); // Aktualisiert den Zustand
    } catch (error) {
      console.error("Failed to delete recipe:", error);
    }
  };
  

  // Funktionen zum Aktualisieren des Zustands
  const handleToggleFavorite = async (id) => {
    try {
      const updatedRecipe = await toggleFavorite(id);
      setRecipes(
        recipes.map((recipe) => (recipe.id === id ? updatedRecipe : recipe))
      );
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };
  // Neue Rezepte hinzufügen
  const handleAddRecipe = async (recipeData) => {
    try {
      const newRecipe = await addRecipe(recipeData);
      setRecipes([...recipes, newRecipe]);
    } catch (error) {
      console.error("Failed to add recipe:", error);
    }
  };

  // Funktion zum Abrufen eines Rezeptes nach ID
  const getRecipeById = async (id) => {
    try {
      const recipe = await fetchRecipeById(id);
      setSelectedRecipe(recipe);
    } catch (error) {
      console.error("Failed to fetch recipe by ID:", error);
    }
  };

  return (
    <RecipesContext.Provider
      value={{
        recipes,
        handleAddRecipe,
        handleDeleteRecipe,
        handleToggleFavorite,
        selectedRecipe,
        getRecipeById,
      }}
    >
      {children}
    </RecipesContext.Provider>
  );
};