import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || !role) {
      setError("Email, password, and role are required");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((user) => user.email === email);

    if (userExists) {
      setError("User already exists");
      setSuccess(false);
    } else {
      users.push({ firstName, lastName, email, password, mobileNumber, role });
      localStorage.setItem("users", JSON.stringify(users));
      setSuccess(true);
      setError("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setMobileNumber("");
      setRole("");
      navigate("/login");
    }
  };

  return (
    <div className="bg-[url('./assets/bg_house.jpg')] bg-cover h-screen flex items-center justify-center">
      <form
        className="flex border border-black backdrop-blur-md p-8 rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2">
          <p className="text-3xl font-bold text-white flex justify-center items-center">
            Sign Up
          </p>
          {error && (
            <div className="text-red-500 text-center">
              <p>{error}</p>
              {error === "User already exists" && (
                <p className="mt-2">
                  <a href="/login" className="text-blue-400 hover:underline">
                    Already have an account? Log in
                  </a>
                </p>
              )}
            </div>
          )}
          {success && (
            <p className="text-green-500 text-center">
              Registration successful!
            </p>
          )}
          <div className="grid grid-cols-1 w-[15rem]">
            <input
              placeholder="First Name"
              type="text"
              className="p-2 rounded-lg border border-gray-400 focus:border-blue-500"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 w-[15rem]">
            <input
              placeholder="Last Name"
              type="text"
              className="p-2 rounded-lg border border-gray-400 focus:border-blue-500"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
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
          <div className="grid grid-cols-1 w-[15rem]">
            <input
              placeholder="Mobile Number"
              type="tel"
              className="p-2 rounded-lg border border-gray-400 focus:border-blue-500"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 w-[15rem]">
            <label className="text-white">Role:</label>
            <div className="flex gap-4">
              <label className="text-white">
                <input
                  type="radio"
                  value="buyer"
                  checked={role === "buyer"}
                  onChange={(e) => setRole(e.target.value)}
                />
                Buyer
              </label>
              <label className="text-white">
                <input
                  type="radio"
                  value="seller"
                  checked={role === "seller"}
                  onChange={(e) => setRole(e.target.value)}
                />
                Seller
              </label>
            </div>
          </div>

          <div className="flex flex-col items-center">
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

export default SignUpForm;
