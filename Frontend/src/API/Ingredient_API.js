const baseURL = 'http://localhost:8080';

export const getIngredients = async () => {
    const response = await fetch(`${baseURL}/fetchIngredients`);
    const data = await response.json();
    return data;
  };