export const TOKEN_KEY = 'auth_token';

export const auth = {
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  login: (token) => {
    localStorage.setItem('token', token);
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getToken: () => {
    return localStorage.getItem('token');
  }
};