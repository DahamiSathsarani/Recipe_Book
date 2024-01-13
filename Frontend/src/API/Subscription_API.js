const baseURL = 'http://localhost:3000';

export const createSubscription = async (email) => {
  
    const response = await fetch(`${baseURL}/createSubscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      if (response.ok) {
        const data = await response.json();
        return { data };
    };
}