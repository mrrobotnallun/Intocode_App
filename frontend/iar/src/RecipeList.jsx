import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { RecipesContext } from "./RecipeContext";
import { useContext } from "react";
import { BsClock, BsStar, BsStarFill, BsTrash } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function RecipeList() {
  
    const { recipes, handleToggleFavorite, handleDeleteRecipe } = useContext(RecipesContext);
    const [filterFavorites, setFilterFavorites] = useState(false);
    const [expandedId, setExpandedId] = useState(null);
    const [searchText, setSearchText] = useState(""); // Zustandsvariable für den Suchtext AIP
    const navigate = useNavigate();
    const [notification, setNotification] = useState(null); //Beim Löschen der Rezepte erhalte ich eine Benachrichtigung

  // Funktion, um zur Detailseite eines Rezepts zu navigieren.
  const handleReadMoreClick = (id) => {
    navigate(`/recipe-details/${id}`);
  };

  // Schaltet den Favoriten-Filter um.
  const toggleFilter = () => {
    setFilterFavorites(!filterFavorites);
  };

  const handleToggle = (id) => {
    handleToggleFavorite(id);
  };

  const handleDelete = async (id) => {
    const recipeToDelete = recipes.find(recipe => recipe.id === id);
    if (recipeToDelete) {
      try {
        await handleDeleteRecipe(id); // Löscht das Rezept und aktualisiert den Zustand
        setNotification(`Recipe '${recipeToDelete.name}' has been deleted.`);
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      } catch (error) {
        console.error("Failed to delete recipe:", error);
        // Optional: Setze eine Fehlerbenachrichtigung
      }
    }
  };

    // Event-Handler für Änderungen im Suchfeld
    const handleSearchChange = (e) => {
        setSearchText(e.target.value.toLowerCase());
    };

    // Kombinierte Filterlogik für Favoriten und Suchtext
    const filteredRecipes = recipes.filter((recipe) => {
        return (!filterFavorites || recipe.isFavorite) && 
               recipe.name.toLowerCase().includes(searchText);
    });
 
 

  return (
    <>
      <div className="container">
      {notification && (
        <div className="alert alert-danger" role="alert">
            {notification}
        </div>
        )}
        {/* Zeigt eine Überschrift an, wenn der Filter aktiv ist. */}
        <h3>{filterFavorites ? "The favorites filter is currently selected." : ""}</h3>
        <h1>My Recipes</h1>
        {/* Suchfeld und Button zum Hinzufügen neuer Rezepte */}
        <div className="row">
          <div className="col-md-9">
            <input
              type="text"
              className="form-control my-3"
              placeholder="Search recipes"
              value={searchText}
              onChange={handleSearchChange} // Event-Handler für Suchtextänderungen
            />
          </div>
          <div className="col-md-3">
            <button
              className="btn btn-primary my-3"
              onClick={() => navigate("/add-recipe")}
            >
              New Recipe +
            </button>
          </div>
        </div>
        {/* Checkbox für den Favoriten-Filter */}
        <div className="container">
          <div className="row">
            <div className="col 12">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="check1"
                  name="option1"
                  value="something"
                  checked={filterFavorites}
                  onChange={toggleFilter} // Hinzufügen eines onChange Event-Handlers
                ></input>
                <label className="form-check-label" htmlFor="check1">
                  Only show favorites
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* Anzeigen der Rezepte */}
        <div className="container mt-3">
          <div className="row">
            {filteredRecipes.map((recipe) => (
              <div className="col-md-4 mb-4" key={recipe.id}>
                <div className="card h-100 d-flex flex-column">
                  <div className="card-body d-flex flex-column">
                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <h5 className="card-title">{recipe.name}</h5>
                      <i className="bi bi-star-fill mr-2"></i>
                      {recipe.isFavorite ? (
                        <BsStarFill
                          className="text-warning"
                          onClick={() => handleToggle(recipe.id)}
                        />
                      ) : (
                        <BsStar onClick={() => handleToggle(recipe.id)} />
                      )}
                    </div>
                    <p className="card-text flex-grow-1 mb-3">
                      {expandedId === recipe.id
                        ? recipe.instructions
                        : `${recipe.instructions.substring(0, 100)}...`}
                    </p>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <div className="d-flex align-items-center">
                        <BsClock className="icon-spacing" />{" "}
                        <span className="time-spacing">
                          {recipe.totalCookingTimeMinutes} min
                        </span>
                      </div>
                      <div className="d-flex align-items-center">
                        {recipe.calories100g} kcal/100g
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleReadMoreClick(recipe.id)}
                      >
                        Show recipe
                      </button>
                      <BsTrash
                        className="delete-icon"
                        onClick={() => handleDelete(recipe.id)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default RecipeList;