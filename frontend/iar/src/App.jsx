import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecipeList from "./RecipeList";
import CreateRecipe from "./CreateRecipe";
import RecipeDetails from "./RecipeDetails";
import { RecipesProvider } from "./RecipeContext.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <RecipesProvider>
        <Router>
          <Routes>
            <Route path="/" element={<RecipeList />} />
            <Route path="/add-recipe" element={<CreateRecipe />} />
            <Route
              path="/recipe-details/:recipeId"
              element={<RecipeDetails />}
            />
          </Routes>
        </Router>
      </RecipesProvider>
    </>
  );
}

export default App;