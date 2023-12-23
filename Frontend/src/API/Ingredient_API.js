const baseURL = 'http://localhost:3000';

export const getIngredients = async () => {
    const response = await fetch(`${baseURL}/fetchIngredients`);
    const data = await response.json();
    return data;
  };