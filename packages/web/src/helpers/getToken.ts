const JWT_TOKEN_KEY = "woovi";

export const getAuthToken = () => localStorage.getItem(JWT_TOKEN_KEY);

export const updateAuthToken = (token?: string | undefined | null) => {
  if (!token) {
    localStorage.removeItem(JWT_TOKEN_KEY);
  } else {
    localStorage.setItem(JWT_TOKEN_KEY, token);
  }
};
