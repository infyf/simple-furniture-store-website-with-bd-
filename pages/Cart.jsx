import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaRegTrashAlt } from 'react-icons/fa';
import { removeFromCart, updateQuantity, clearCart } from '../slices/cartSlices';
import axios from 'axios';
import ToastMessage from './ToastMessage';
import CheckoutForm from './CheckoutForm';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);  // Стан для показу процесу відправки
  const formRef = useRef(null);

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity: parseInt(quantity) }));
  };

  const handleEmptyCart = () => {
    dispatch(clearCart());
  };

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSubmitOrder = async () => {
    if (cartItems.length === 0) {
      setError('Ваш кошик порожній');
      return;
    }

    // Підготовка даних для API
    const cartItemsForApi = cartItems.map((item) => ({
      id: item.id,
      productName: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    try {
      setIsSubmitting(true);  // Активуємо процес відправки
      const response = await axios.post('https://localhost:7080/api/cart', cartItemsForApi);
      if (response.status === 200) {
        setSuccessMessage('Ваше замовлення успішно оформлено!');
        dispatch(clearCart());  // Очищаємо кошик після успішного замовлення
      } else {
        setError('Щось пішло не так! Спробуйте ще раз.');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      setError('Не вдалося оформити замовлення. Спробуйте ще раз.');
    } finally {
      setIsSubmitting(false);  // Завершуємо процес відправки
    }
  };

  const handleFormSubmit = () => {
    setIsFormFilled(true);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-11/12 py-3 min-h-[50vh]">
        <h2 className="text-center text-2xl font-bold mb-4">Мій кошик</h2>

        {error && <ToastMessage message={error} type="error" onClose={() => setError(null)} />}
        {successMessage && <ToastMessage message={successMessage} type="success" onClose={() => setSuccessMessage(null)} />}

        <table className="w-full h-full">
          <thead className="bg-gray-300">
            <tr className="font-bold">
              <th className="py-3">ID</th>
              <th className="py-3">Назва</th>
              <th className="py-3">Кількість</th>
              <th className="py-3">Ціна</th>
              <th className="py-3">Дія</th>
            </tr>
          </thead>
          <tbody className="bg-gray-50">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <tr key={item.id} className="hover:bg-green-200 text-center">
                  <td className="py-3">{item.id}</td>
                  <td className="py-3">{item.name}</td>
                  <td className="py-3">
                    <select
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      className="border p-1"
                    >
                      {[...Array(10).keys()].map((num) => (
                        <option key={num} value={num + 1}>
                          {num + 1}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3">${item.price.toFixed(2)}</td>
                  <td className="py-3">
                    <button onClick={() => handleRemoveItem(item.id)} className="text-red-500">
                      <FaRegTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-3">Кошик порожній</td>
              </tr>
            )}
          </tbody>
          <tfoot className="bg-gray-50 w-full">
            <tr className="py-2 px-3">
              <td colSpan="3" className="text-left px-3 font-bold">Загальна кількість: {totalQuantity}</td>
              <td colSpan="2" className="text-right px-3 font-bold">Загальна сума: ${totalAmount.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>

        <div className="flex justify-between py-4">
          <button onClick={handleEmptyCart} className="text-red-500 flex justify-center items-center gap-3">
            <FaRegTrashAlt /> Очистити кошик
          </button>
          {!isFormFilled ? (
            <button onClick={handleFormSubmit} className="bg-blue-500 text-white py-2 px-4 rounded">
              Перейти до форми
            </button>
          ) : (
            <button
              onClick={handleSubmitOrder}
              className={`bg-green-500 text-white py-2 px-4 rounded ${isSubmitting && 'cursor-wait opacity-50'}`}
              disabled={isSubmitting || !isFormFilled}
            >
              {isSubmitting ? 'Зачекайте...' : 'Оформити замовлення'}
            </button>
          )}
        </div>

        {/* Форма завжди відображається */}
        <div ref={formRef}>
          <CheckoutForm onFormFilled={setIsFormFilled} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
