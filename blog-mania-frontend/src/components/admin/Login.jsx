import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

/**
 * Renders the administrative login form component.
 * Parameters: None.
 * The function manages the email and password state, handles form submission, attempts API authentication, and manages token storage.
 */
const Login = () => {
  const { axios, setToken } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/admin/login", {
        email,
        password,
      });

      if (response.status === 200) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        axios.defaults.headers.common["Authorization"] = response.data.token;
        toast.success("Login successful!");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };
  // console.log(email, password);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className=" border border-secondary/20 shadow-xl rounded-2xl p-8 w-[90%] max-w-sm text-center">
        <h1 className="text-2xl font-semibold text-text mb-6">Admin Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 bg-transparent border-b border-secondary/20 text-text placeholder:text-gray-400 outline-none"
          />
          <input
            onChange={(e) => {
              setPass(e.target.value);
            }}
            value={password}
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 bg-transparent border-b border-secondary/20 text-text placeholder:text-gray-400 outline-none"
          />
          <button
            type="submit"
            className="mt-2 bg-secondary text-text font-medium py-2 rounded-md hover:opacity-90 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
