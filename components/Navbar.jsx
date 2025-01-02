import React, { useState } from "react";
import { Link } from "react-router-dom";
import CartOffset from "./CartOffset";
import WishlistOffset from "./WishlistOffset";
import AuthForm from "../pages/AuthForm"; 

const Navbar = () => {
  const [isAuthFormVisible, setAuthFormVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);  // Додаємо стан аутентифікації

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "Cart", path: "/cart" },
    { label: "Wishlist", path: "/wishlist" },
  ];

  const handleAuthFormToggle = () => {
    setAuthFormVisible(!isAuthFormVisible);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);  // Вихід з системи
    localStorage.removeItem("token");  // Видаляємо токен з localStorage
  };

  return (
    <div className="w-full flex justify-center py-4 items-center shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
      <div className="w-10/12 flex justify-center py-4 px-2 items-center">
        <div className="flex-1">
          <h1 className="logo font-bold text-2xl">Furniture</h1>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <ul className="flex gap-4 justify-center items-center">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link to={item.path} className="hover:text-gray-700 px-2 py-1 rounded">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 flex justify-end items-center gap-4">
          <WishlistOffset />
          <CartOffset />
          {isAuthenticated ? (
            <button 
              onClick={handleLogout} 
              className="auth-btn bg-[#d1c355] text-white py-2 px-4 rounded hover:bg-[#C49B30] transition duration-300">
              Вийти
            </button>
          ) : (
            <button 
              onClick={handleAuthFormToggle} 
              className="auth-btn bg-[#d1c355] text-white py-2 px-4 rounded hover:bg-[#C49B30] transition duration-300">
              Вхід/Реєстрація
            </button>
          )}
        </div>
      </div>
      {isAuthFormVisible && <AuthForm closeForm={handleAuthFormToggle} setIsAuthenticated={setIsAuthenticated} />}
    </div>
  );
};

export default Navbar;
