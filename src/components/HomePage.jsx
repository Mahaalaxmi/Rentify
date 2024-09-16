import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const handleStartSearching = () => {
    if (loggedInUser && loggedInUser.role === "buyer") {
      navigate("/house-list");
    } else if (!loggedInUser) {
      navigate("/signup");
    }
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div>
      <section className="bg-[url('./assets/bg_house.jpg')] bg-cover h-screen flex items-center justify-center">
        <div className="text-center text-white p-8 backdrop-blur-md rounded-lg">
          <h1 className="text-6xl font-bold mb-4">Welcome to Rentify!</h1>
          <h3 className="text-3xl mb-6">Find Your Perfect Rental Home</h3>
          <p className="text-lg">
            Explore thousands of rental properties in your desired location.
          </p>
          <div className="mt-8">
            <button
              className="bg-yellow-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-yellow-600 transition-all duration-300"
              onClick={handleStartSearching}
            >
              Start Searching
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="2xl:container mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800">
              Why Choose Rentify?
            </h2>
            <p className="text-gray-600 mt-4">
              Discover the benefits of using Rentify to find your next home.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 shadow-lg rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-4">Wide Selection</h3>
              <p className="text-gray-600">
                We offer a vast range of rental properties to suit every budget
                and preference.
              </p>
            </div>

            <div className="bg-white p-8 shadow-lg rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-4">User-Friendly</h3>
              <p className="text-gray-600">
                Our platform is designed with ease of use in mind, making your
                property search a breeze.
              </p>
            </div>

            <div className="bg-white p-8 shadow-lg rounded-lg text-center">
              <h3 className="text-xl font-semibold mb-4">Verified Listings</h3>
              <p className="text-gray-600">
                All properties are verified to ensure that you get exactly what
                you see.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-yellow-500 text-white">
        <div className="2xl:container mx-auto text-center">
          <h2 className="text-4xl font-bold">
            Ready to Find Your Dream Rental?
          </h2>
          <p className="mt-4 text-lg">
            Join thousands of happy renters and discover your next home today.
          </p>
          <div className="mt-8">
            {!loggedInUser && (
              <button
                className="bg-white text-yellow-500 font-bold py-3 px-6 rounded-lg hover:bg-gray-200 transition-all duration-300"
                onClick={handleSignUp}
              >
                Sign Up Now
              </button>
            )}
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8">
        <div className="2xl:container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Rentify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
