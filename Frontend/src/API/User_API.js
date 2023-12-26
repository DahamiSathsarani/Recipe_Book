const baseURL = 'http://localhost:3000';

export const getUsers = async () => {
    const response = await fetch(`${baseURL}/fetchUsers`);
    const data = await response.json();
    return data;
  };

export const createUser = async (userData) => {
  const formData = new FormData();

    // Append each field to the FormData object
    Object.keys(userData).forEach((key) => {
      if (key === 'userProPic' && userData[key]) {
        // If the field is the file and it exists, append it to FormData directly
        formData.append('userProPic', userData[key]);
      } else {
        // For other fields, check if it's an object (likely JSON), then stringify it
        if (typeof userData[key] === 'object') {
          formData.append(key, JSON.stringify(userData[key]));
        } else {
          formData.append(key, userData[key]);
        }
      }
    });

    const response = await fetch(`${baseURL}/createUser`, {
      method: 'POST',
      body: formData, 
    });
    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    }
};

export const login = async (userData) => {
  const response = await fetch(`${baseURL}/fetchUser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  console.log(JSON.stringify(response))
  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

export const updateUser = async (userData) => {
  const response = await fetch(`${baseURL}/updateUser`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  console.log(JSON.stringify(response))
  if (response.ok) {
    const data = await response.json();
    return data;
  }
};

export const deleteUser = async (userData) => {
  const response = await fetch(`${baseURL}/softDeleteUser`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  console.log(JSON.stringify(response))
  if (response.ok) {
    const data = await response.json();
    return data;
  }
};
