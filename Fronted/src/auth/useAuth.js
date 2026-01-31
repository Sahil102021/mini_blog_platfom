export const getToken = () => {
  return localStorage.getItem("token");
};

export const isAuthenticated = () => {
  const token = getToken();
  return Boolean(token);
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userData");
  window.location.href = "/login";
};

export const setToken = (token) => {
  return localStorage.setItem("token", token);
};

export const setUserData = (userData) => {
  return localStorage.setItem("userData", userData);
}

export const getUserData = () => {
  const data = localStorage.getItem("userData");
  return data ? data : null;
}
