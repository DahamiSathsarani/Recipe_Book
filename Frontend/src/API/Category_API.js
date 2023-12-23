const baseURL = 'http://localhost:3000';

export const getCategories = async () => {
    const response = await fetch(`${baseURL}/fetchCategories`);
    const data = await response.json();
    return data;
  };