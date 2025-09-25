import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LeftSide from "./components/AuthPage/LeftSide";
import LoginForm from "./components/AuthPage/LoginForm";
import RegisterForm from "./components/AuthPage/RegisterForm";
import Products from "./components/Products/Products";
import "./components/AuthPage/AuthPage.css";
import CartPage from "./components/Products/CartPage";

const AuthLayout = ({ children }) => (
  <div className="auth-page">
    <LeftSide />
    {children}
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <AuthLayout>
              <LoginForm />
            </AuthLayout>
          }
        />
        <Route
          path="/register"
          element={
            <AuthLayout>
              <RegisterForm />
            </AuthLayout>
          }
        />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;

