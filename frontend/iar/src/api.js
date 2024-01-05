// api.js
const BASE_URL = "http://localhost:3000/recipes";

// Fetch alle Rezepte
export const fetchRecipes = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error("Network response was not ok.");
    return await response.json();
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};

// Favoritenstatus
export const toggleFavorite = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}/favorite`, {
      method: "PUT",
    });
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error toggling favorite:", error);
    throw error;
  }
};

// Rezept löschen
export const deleteRecipe = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    // Überprüfen, ob der Antwortinhalt leer ist
    if (response.status === 204) {
      return null; // Oder eine passende Antwort für eine leere Antwort
    } else {
      return await response.json();
    }
  } catch (error) {
    console.error("Error deleting recipe:", error);
    throw error;
  }
};

// Neues Rezept erstellen
export const addRecipe = async (recipeData) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeData),
    });
    if (!response.ok) throw new Error("Network response was not ok.");
    return await response.json();
  } catch (error) {
    console.error("Error adding recipe:", error);
    throw error;
  }
};

//Fetch Rezepte nach ID
export const fetchRecipeById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching recipe by ID:", error);
    throw error;
  }
};