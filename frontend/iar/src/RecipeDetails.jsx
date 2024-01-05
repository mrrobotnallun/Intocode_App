import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RecipesContext } from "./RecipeContext";
import { BsClock } from "react-icons/bs";
import { Link } from "react-router-dom";

const RecipeDetails = () => {
  const { recipeId } = useParams(); // Extrahiert die recipeId aus der URL
  const { selectedRecipe, getRecipeById } = useContext(RecipesContext);

  useEffect(() => {
    if (recipeId) {
      getRecipeById(recipeId);
    }
  }, [recipeId, getRecipeById]);

  if (!selectedRecipe) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container py-5">
      <h1 className="display-4 mb-4">{selectedRecipe.name}</h1>
      <h2 className="h5 mb-3">Ingredients</h2>
      <ul className="">
        {selectedRecipe.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.name}: {ingredient.quantity}
          </li>
        ))}
      </ul>

      <h2 className="h5 mb-3">Instructions</h2>
      <p>{selectedRecipe.instructions}</p>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <p>
          <BsClock className="me-2" />
          {selectedRecipe.totalCookingTimeMinutes} min
        </p>
        <p>{selectedRecipe.calories100g} kcal/100g</p>
      </div>

      <Link to="/" className="btn btn-secondary mt-4">
        Back home
      </Link>
    </div>
  );
};

export default RecipeDetails;