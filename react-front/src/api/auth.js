// src/api/auth.js
export const mockLogin = async (username, password) => {
    if (username === 'user' && password === 'password') {
      return { success: true, message: 'Login successful' };
    } else {
      return { success: false, message: 'Invalid credentials' };
    }
  };
  