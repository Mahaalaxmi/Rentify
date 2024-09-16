import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import NavigationBar from "./components/NavigationBar";
import SellerDashboard from "./components/SellerDashboard";
import HouseList from "./components/HouseList";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        <Route path="/house-list" element={<HouseList />} />
      </Routes>
    </Router>
  );
}

export default App;
