import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import KiteApp from "./components/KiteApp";

// If we arrived here from the signup flow (different origin), the user's
// details are passed in the URL. Persist them locally, then clean the URL.
(function captureSignupUser() {
  try {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    if (name) {
      localStorage.setItem(
        "zerodha_user",
        JSON.stringify({
          name,
          email: params.get("email") || "",
          phone: params.get("phone") || "",
        })
      );
      // Remove the query string so it doesn't linger / get bookmarked.
      window.history.replaceState({}, "", window.location.pathname);
    }
  } catch (_) {
    /* ignore */
  }
})();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <KiteApp />
    </BrowserRouter>
  </React.StrictMode>
);
