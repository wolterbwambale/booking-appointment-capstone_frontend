// api.js
const authorizedRequest = async (url, method = 'GET', data = null) => {
  try {
    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token);

    if (!token) {
      throw new Error('Token not found in localStorage.');
    }

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const config = {
      method,
      headers,
    };

    if (method !== 'GET') {
      config.body = data ? JSON.stringify(data) : null;
    }

    const response = await fetch(url, config);

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error('Server error response:', errorResponse);
      throw new Error(errorResponse.message || 'Request failed');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Request Error:', error.message);
    throw error;
  }
};

export default authorizedRequest;
