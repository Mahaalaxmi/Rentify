import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const defaultSeller = {
    email: "seller@example.com",
    password: "sellerpassword",
    role: "seller",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (email === defaultSeller.email && password === defaultSeller.password) {
      localStorage.setItem("user", JSON.stringify(defaultSeller));
      setSuccess(true);
      setError("");

      navigate("/seller-dashboard");
    } else if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setSuccess(true);
      setError("");

      if (user.role === "seller") {
        navigate("/seller-dashboard");
      } else {
        navigate("/house-list");
      }
    } else {
      setError("Invalid email or password");
      setSuccess(false);
    }
  };

  return (
    <div className="bg-[url('./assets/bg_house.jpg')] bg-cover h-screen flex items-center justify-center">
      <form
        className="flex border border-black backdrop-blur-md p-8 rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-5">
          <p className="text-3xl font-bold text-white flex justify-center items-center">
            Login
          </p>
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && (
            <p className="text-green-500 text-center">Login successful!</p>
          )}
          <div className="grid grid-cols-1 w-[15rem]">
            <input
              placeholder="Email"
              type="email"
              className="p-2 rounded-lg border border-gray-400 focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 w-[15rem]">
            <input
              placeholder="Password"
              type="password"
              className="p-2 rounded-lg border border-gray-400 focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
