// Save JWT
export function saveToken(token) {
  localStorage.setItem("token", token);
}

// Get JWT
export function getToken() {
  return localStorage.getItem("token");
}

// Remove JWT
export function clearToken() {
  localStorage.removeItem("token");
}

// Check login
export function isAuthenticated() {
  return !!getToken();
}

// Decode JWT payload safely on the frontend
export function getUserDataFromToken() {
  const token = getToken();
  if (!token) return null;
  try {
    // JWT structure: header.payload.signature
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
}