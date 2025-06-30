import React, { useState } from "react";
import ToastMessage from './ToastMessage';

const CheckoutForm = () => {
  const [recipient, setRecipient] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    phone: "",
    street: "",
    city: "",
    country: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    phone: "",
    email: "",
  });

  const [showErrorModal, setShowErrorModal] = useState(false); 
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);


  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleRecipientChange = (e) => {
    const { name, value } = e.target;
    setRecipient((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(recipient.email)) {
      newErrors.email = "Невірний формат електронної пошти.";
    }


    const phoneRegex = /^\+380\d{9}$/;
    if (!phoneRegex.test(recipient.phone)) {
      newErrors.phone = "Невірний формат номеру телефону.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);

      const checkoutData = {
        ...recipient,
        deliveryMethod,
        paymentMethod,
        createdAt: new Date().toISOString(),
      };

      try {
        const response = await fetch('https://localhost:7080/api/checkout', {
          method: 'POST',
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(checkoutData),
        });

        if (!response.ok) {
          throw new Error('Помилка при відправці даних на сервер');
        }

        setSuccessMessage("Замовлення підтверджено!");
      } catch (error) {
        console.error('Помилка:', error);
        setShowErrorModal(true);
      } finally {
        setLoading(false);
      }
    } else {
      setShowErrorModal(true);
    }
  };

  return (
    <>

      {successMessage && (
        <ToastMessage
          message={successMessage}
          type="success"
          onClose={() => setSuccessMessage("")}
        />
      )}

      <form
        onSubmit={handleSubmit}
        className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6">Доставка</h2>
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="storePickup"
              name="deliveryMethod"
              value="Самовивіз з наших магазинів"
              onChange={(e) => setDeliveryMethod(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="storePickup" className="text-gray-800">
              Самовивіз з наших магазинів
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="courierDelivery"
              name="deliveryMethod"
              value="Кур’єр на вашу адресу"
              onChange={(e) => setDeliveryMethod(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="courierDelivery" className="text-gray-800">
              Кур’єр на вашу адресу
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="meest"
              name="deliveryMethod"
              value="Самовивіз з Meest ПОШТА"
              onChange={(e) => setDeliveryMethod(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="meest" className="text-gray-800">
              Самовивіз з Meest ПОШТА
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="novaPoshta"
              name="deliveryMethod"
              value="Самовивіз з Нової Пошти"
              onChange={(e) => setDeliveryMethod(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="novaPoshta" className="text-gray-800">
              Самовивіз з Нової Пошти
            </label>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Оплата</h2>
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="onDelivery"
              name="paymentMethod"
              value="Оплата під час отримання товару"
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="onDelivery" className="text-gray-800">
              Оплата під час отримання товару
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="payNow"
              name="paymentMethod"
              value="Оплатити зараз"
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="payNow" className="text-gray-800">
              Оплатити зараз
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="radio"
              id="bankTransfer"
              name="paymentMethod"
              value="Безготівковий для фізичних осіб"
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            <label htmlFor="bankTransfer" className="text-gray-800">
              Безготівковий для фізичних осіб
            </label>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-6">Отримувач</h2>
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            value={recipient.firstName}
            onChange={handleRecipientChange}
            placeholder="Ім’я"
            className="p-3 border rounded w-full"
          />
          <input
            type="text"
            name="lastName"
            value={recipient.lastName}
            onChange={handleRecipientChange}
            placeholder="Прізвище"
            className="p-3 border rounded w-full"
          />
          <input
            type="text"
            name="middleName"
            value={recipient.middleName}
            onChange={handleRecipientChange}
            placeholder="По батькові"
            className="p-3 border rounded w-full"
          />
          <input
            type="text"
            name="phone"
            value={recipient.phone}
            onChange={handleRecipientChange}
            placeholder="Мобільний телефон"
            className={`p-3 border rounded w-full ${errors.phone ? 'border-red-500' : ''}`}
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          <input
            type="text"
            name="street"
            value={recipient.street}
            onChange={handleRecipientChange}
            placeholder="Вулиця"
            className="p-3 border rounded w-full"
          />
          <input
            type="text"
            name="city"
            value={recipient.city}
            onChange={handleRecipientChange}
            placeholder="Місто"
            className="p-3 border rounded w-full"
          />
          <input
            type="text"
            name="country"
            value={recipient.country}
            onChange={handleRecipientChange}
            placeholder="Країна"
            className="p-3 border rounded w-full"
          />
          <input
            type="email"
            name="email"
            value={recipient.email}
            onChange={handleRecipientChange}
            placeholder="Електронна пошта"
            className={`p-3 border rounded w-full ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <button
          type="submit"
          className={`w-full py-3 bg-blue-500 text-white rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? "Завантаження..." : "Оформити замовлення"}
        </button>
      </form>

      {showErrorModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="text-lg font-semibold text-red-500">Помилка</h3>
            <p className="text-gray-800">Будь ласка, перевірте введені дані.</p>
            <button
              className="mt-4 py-2 px-4 bg-blue-500 text-white rounded"
              onClick={() => setShowErrorModal(false)}
            >
              Закрити
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;
