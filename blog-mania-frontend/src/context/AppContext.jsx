import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

/**
 * Creates the React Context object for the application.
 * This context will hold global state and utility functions.
 */
const AppContext = createContext();

//from env backend url
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [input, setInput] = useState("");

  //fetch blog globally
  const fetchBlogs = async () => {
  try {
    const response = await axios.get("/api/blog/all");
    if (response.status === 200 && Array.isArray(response.data.blogs)) {
      setBlogs(response.data.blogs);
    } else {
      toast.error(response.data.message || "Invalid blog data");
    }
  } catch (error) {
    toast.error(error.message);
  }
};

  useEffect(() => {
    fetchBlogs();
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      axios.defaults.headers.common["Authorization"] = `${token}`;
    }
  }, []);

  //pass as props so we can use in whole app like redux store
  const value = {
    axios,
    navigate,
    token,
    setToken,
    blogs,
    setBlogs,
    input,
    setInput,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export const useAppContext = () => {
  return useContext(AppContext);
};
