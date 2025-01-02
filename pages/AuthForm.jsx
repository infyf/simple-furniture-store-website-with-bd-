import React, { useState } from "react";
import ToastMessage from "./ToastMessage";

const AuthForm = ({ closeForm, setIsAuthenticated }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Загальний обробник змін для інпутів
  const handleInputChange = (setter) => (e) => setter(e.target.value);

  const resetFormState = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
  };

  const handleGoToRegister = () => {
    resetFormState();
    setIsRegistering(true);
  };

  const handleGoToLogin = () => {
    resetFormState();
    setIsRegistering(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Введіть коректний email.");
      return;
    }
    try {
      const response = await fetch("https://localhost:7080/api/Auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setError(errorText);
      } else {
        const data = await response.json();
        setToastMessage(`Ласкаво просимо, ${data.user.email}!`);
        setToastType("success");
        localStorage.setItem("token", data.token); // Зберігаємо токен в localStorage
        setIsAuthenticated(true);

        // Відкладаємо закриття форми
        setTimeout(() => {
          closeForm();
        }, 3000);
      }
    } catch (err) {
      setError("Помилка під час входу. Спробуйте ще раз.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Введіть коректний email.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Паролі не співпадають.");
      return;
    }

    try {
      const response = await fetch("https://localhost:7080/api/Auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setError(errorText);
      } else {
        setToastMessage("Реєстрація успішна! Тепер ви можете увійти.");
        setToastType("success");
        setIsRegistering(false);
        resetFormState();
      }
    } catch (err) {
      setError("Помилка під час реєстрації. Спробуйте ще раз.");
    }
  };

  return (
    <>
      <div className="auth-overlay fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-70 flex items-center justify-center z-50">
        <div className="auth-form-container bg-white p-8 rounded-lg shadow-2xl w-full max-w-md relative transition-all duration-300 transform hover:scale-105">
          <button
            onClick={closeForm}
            className="close-btn absolute top-4 right-4 p-2 text-xl text-gray-600 hover:text-black transition duration-200"
          >
            ×
          </button>

          {!isRegistering ? (
            <>
              <h2 className="text-center text-3xl font-semibold mb-6 text-[#2c3e50]">Вхід</h2>
              <form onSubmit={handleLogin} className="w-full flex flex-col items-center space-y-6">
                <div className="input-group w-full">
                  <label htmlFor="email" className="block text-gray-700 font-semibold">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleInputChange(setEmail)}
                    placeholder="E-mail"
                    required
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c3e50] transition duration-200"
                  />
                </div>
                <div className="input-group w-full">
                  <label htmlFor="password" className="block text-gray-700 font-semibold">Пароль</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handleInputChange(setPassword)}
                    placeholder="Пароль"
                    required
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c3e50] transition duration-200"
                  />
                </div>
                <button type="submit" className="w-full py-3 text-white bg-[#2c3e50] rounded-lg hover:bg-[#34495e] transition duration-200">
                  Вхід
                </button>
              </form>
              <div className="switch-to-register mt-4 text-center text-[#2c3e50]">
                <p>
                  Немає акаунту?{" "}
                  <button onClick={handleGoToRegister} className="text-blue-500 hover:underline transition duration-200">
                    Зареєструватися
                  </button>
                </p>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-center text-3xl font-semibold mb-6 text-[#2c3e50]">Реєстрація</h2>
              <form onSubmit={handleRegister} className="w-full flex flex-col items-center space-y-6">
                <div className="input-group w-full">
                  <label htmlFor="email" className="block text-gray-700 font-semibold">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleInputChange(setEmail)}
                    placeholder="E-mail"
                    required
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c3e50] transition duration-200"
                  />
                </div>
                <div className="input-group w-full">
                  <label htmlFor="password" className="block text-gray-700 font-semibold">Пароль</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handleInputChange(setPassword)}
                    placeholder="Пароль"
                    required
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c3e50] transition duration-200"
                  />
                </div>
                <div className="input-group w-full">
                  <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold">Підтвердження паролю</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={handleInputChange(setConfirmPassword)}
                    placeholder="Підтвердження паролю"
                    required
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2c3e50] transition duration-200"
                  />
                </div>
                <button type="submit" className="w-full py-3 text-white bg-[#2c3e50] rounded-lg hover:bg-[#34495e] transition duration-200">
                  Зареєструватися
                </button>
              </form>
              <div className="switch-to-login mt-4 text-center text-[#2c3e50]">
                <p>
                  Є акаунт?{" "}
                  <button onClick={handleGoToLogin} className="text-blue-500 hover:underline transition duration-200">
                    Увійти
                  </button>
                </p>
              </div>
            </>
          )}
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
      </div>
      {toastMessage && (
        <ToastMessage
          message={toastMessage}
          type={toastType}
          onClose={() => setToastMessage("")}
        />
      )}
    </>
  );
};

export default AuthForm;
