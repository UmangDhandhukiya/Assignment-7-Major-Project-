import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import { useAppContext } from '../../context/AppContext';

/**
 * Renders the main administrative layout component, consisting of a persistent header, a sidebar, and an outlet for nested routes.
 * Parameters: None. It retrieves global state (axios, setToken, navigate) from useAppContext.
 * The component provides the core structure for the dashboard and includes the logout functionality.
 */
const Layout = () => {

   const { axios, setToken, navigate } = useAppContext();

  const logout = () => {
    localStorage.removeItem('token');
    axios.defaults.headers.common['Authorization'] = null;
    setToken(null);
    navigate('/');
  };

  return (
    <>
      <div className="flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-500">
        <h1
          onClick={() => navigate("/")}
          className="text-secondary text-2xl font-semibold cursor-pointer"
        >
          Blog Mania./
        </h1>

        <button
          onClick={logout}
          className="bg-secondary px-6 py-2 rounded-md cursor-pointer text-text text-sm hover:opacity-90 transition"
        >
          Logout
        </button>
      </div>

      <div className="flex h-[calc(100vh-70px)] text-text">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
