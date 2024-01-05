import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { RecipesContext } from "./RecipeContext";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function CreateRecipe() {
  const { handleAddRecipe } = useContext(RecipesContext); // Verwende Context
  const [recipe, setRecipe] = useState({
    name: "",
    instructions: "",
    cookingTime: "",
    calories: "",
    ingredients: [{ name: "", amount: "", unit: "" }],
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Handler für Änderungen in den Formularfeldern
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  // Handler für Änderungen in den Zutaten des Formulars
  const handleIngredientChange = (index, e) => {
    const updatedIngredients = recipe.ingredients.map((ingredient, i) => {
      if (i === index) {
        return { ...ingredient, [e.target.name]: e.target.value };
      }
      return ingredient;
    });

    setRecipe({ ...recipe, ingredients: updatedIngredients });
  };

  // Handler um eine neue Zutat der Liste hinzuzufügen
  const handleAddIngredient = () => {
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, { name: "", amount: 0, unit: "" }],
    });
  };

    // Handler um die letzte Zutat der Liste zu löschen
    const handleRemoveLastIngredient = () => {
        if (recipe.ingredients.length > 1) {
          const newIngredients = recipe.ingredients.slice(0, -1);
          setRecipe({ ...recipe, ingredients: newIngredients });
        }
      };

  // Handler um das Rezept zu speichern
  const handleSave = async () => {
    try {
      await handleAddRecipe(recipe);
      setMessage("Das Rezept wurde erfolgreich gespeichert.");
      setTimeout(() => {
        navigate("/");
      }, 2000); // Warte 2 Sekunden, bevor navigieren.
    } catch (error) {
      console.error("Fehler beim Speichern des Rezepts:", error);
      setMessage("Fehler beim Speichern des Rezepts.");
    }
  };

  // Handler um das Formular abzubrechen und zurück zu navigieren
  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="container">
      <h1>Create Recipe</h1>
      {/* Eingabefeld für den Rezeptnamen */}
      <div className="mb-3">
        <label htmlFor="RecipeName" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={recipe.name}
          onChange={handleInputChange}
        />
      </div>
      {/* Textfeld für die Rezeptanweisungen */}
      <div className="mb-3">
        <label htmlFor="instructions" className="form-label">
          Instructions
        </label>
        <textarea
          className="form-control"
          name="instructions"
          value={recipe.instructions}
          onChange={handleInputChange}
        />
      </div>
      {/* Eingabefelder für Zubereitungszeit und Kalorien */}
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="prepTime" className="form-label">
            Cooking time (min)
          </label>
          <input
            type="number"
            className="form-control"
            name="cookingTime"
            value={recipe.cookingTime}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="kcal" className="form-label">
            Kcal/100g
          </label>
          <input
            type="number"
            className="form-control"
            name="calories"
            value={recipe.calories}
            onChange={handleInputChange}
          />
        </div>
      </div>
      {/* Abschnitt für die Eingabe der Zutaten */}
      <h2>Ingredients</h2>
      {recipe.ingredients.map((ingredient, index) => (
        <div key={index} className="row mb-2">
          <div className="col-md-4">
            <label htmlFor="NameIngredients" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(index, e)}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="AmountIngredients" className="form-label">
              Amount
            </label>
            <input
              type="number"
              className="form-control"
              name="amount"
              value={ingredient.amount}
              onChange={(e) => handleIngredientChange(index, e)}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="UnitIngredients" className="form-label">
              Unit
            </label>
            <input
              type="text"
              className="form-control"
              name="unit"
              value={ingredient.unit}
              onChange={(e) => handleIngredientChange(index, e)}
            />
          </div>
        </div>
      ))}
      {/* Buttons für das Hinzufügen und Entfernen von Zutaten */}
      <div className="d-flex justify-content-center mb-3">
        <button className="btn btn-primary" onClick={handleAddIngredient}>
          +
        </button>
        {recipe.ingredients.length > 1 && (
            <button className="btn btn-danger" onClick={handleRemoveLastIngredient}>
              -
            </button>
          )}
      </div>
      {/* Buttons um das Formular zu speichern oder abzubrechen */}
      <div className="text-end">
        <button className="btn btn-secondary me-2" onClick={handleCancel}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={handleSave}>
          Save
        </button>
        {message && (
          <div className="alert alert-success" role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateRecipe;