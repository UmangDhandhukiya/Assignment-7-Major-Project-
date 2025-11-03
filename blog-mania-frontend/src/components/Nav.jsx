import React from "react";
import { useAppContext } from "../context/AppContext";

/**
 * Renders the primary navigation bar for the application.
 * Parameters: None. It retrieves global state (navigate function and authentication token) from useAppContext.
 * The component displays the site title, which acts as a home link, and a dynamic button that links either to the admin dashboard (if authenticated) or the login page.
 */
const Nav = () => {
  const { navigate, token } = useAppContext();

  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">
      <h1
        onClick={() => navigate("/")}
        className="text-secondary text-2xl font-semibold cursor-pointer"
      >
        Blog Mania./
      </h1>

      {/* login button condition based */}
      <button
        onClick={() => navigate("/admin")}
        className="bg-secondary px-6 py-2 rounded-md cursor-pointer text-text text-sm"
      >
        {token ? "Dashboard" : "Login"}
      </button>
    </div>
  );
};

export default Nav;
