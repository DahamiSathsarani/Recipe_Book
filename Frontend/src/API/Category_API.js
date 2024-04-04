const baseURL = 'http://localhost:8080';

export const getCategories = async () => {
    const response = await fetch(`${baseURL}/fetchCategories`);
    const data = await response.json();
    return data;
  };

  export const getCategory = async (category_id) => {
    const response = await fetch(`${baseURL}/fetchCategory/${category_id}`);
    const data = await response.json();
    return data;
    }