const baseURL = 'http://localhost:3000';

export const createRecipe = async (recipeData, user_id) => {
  console.log("user_id", user_id)
  
    const formData = new FormData();

    // Append each field to the FormData object
    Object.keys(recipeData).forEach((key) => {
      if (key === 'recipePic' && recipeData[key]) {
        // If the field is the file and it exists, append it to FormData directly
        formData.append('recipePic', recipeData[key]);
      } else {
        // For other fields, check if it's an object (likely JSON), then stringify it
        if (typeof recipeData[key] === 'object') {
          formData.append(key, JSON.stringify(recipeData[key]));
        } else {
          formData.append(key, recipeData[key]);
        }
      }
    });

    // Append user_id to FormData
    formData.append('userId', user_id);

    const response = await fetch(`${baseURL}/createRecipe`, {
      method: 'POST',
      body: formData, 
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
  }
};
  
export const getRecipes = async () => {
  const response = await fetch(`${baseURL}/fetchRecipes/${0}`);
  const data = await response.json();
  return data;
};

export const getSpecificUserRecipes = async (user_id) => {
  const response = await fetch(`${baseURL}/fetchRecipes/${user_id}`);
  const data = await response.json();
  return data;
  };

export const getRecipe = async (recipeData) => {
  const response = await fetch(`${baseURL}/fetchRecipe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recipeData),
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

export const getCategorizedRecipes = async (category_id) => {
  const response = await fetch(`${baseURL}/fetchCategorizedRecipes/${category_id}`);
  const data = await response.json();
  return data;
  };



