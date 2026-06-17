export const AUTH_SESSION_KEY = "zerodha_auth";
export const USER_STORAGE_KEY = "zerodha_user";

export const LOGIN_EMAIL = "vishnusaicharan@gmail.com";
export const LOGIN_PASSWORD = "admin12";

export const LOGIN_USER = {
  name: "Vishnu Sai Charan",
  email: LOGIN_EMAIL,
  phone: "",
};

export const isSignedIn = () => {
  try {
    return localStorage.getItem(AUTH_SESSION_KEY) === "true";
  } catch (_) {
    return false;
  }
};

export const signIn = (email, password) => {
  if (email.trim().toLowerCase() !== LOGIN_EMAIL || password !== LOGIN_PASSWORD) {
    return false;
  }

  try {
    localStorage.setItem(AUTH_SESSION_KEY, "true");
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(LOGIN_USER));
  } catch (_) {
    /* ignore storage errors */
  }

  return true;
};

export const signInWithUser = (user) => {
  try {
    localStorage.setItem(AUTH_SESSION_KEY, "true");
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  } catch (_) {
    /* ignore storage errors */
  }
};

export const signOut = () => {
  try {
    localStorage.removeItem(AUTH_SESSION_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
  } catch (_) {
    /* ignore storage errors */
  }
};
