import React, { useState } from 'react';
import { RiShoppingCartLine } from 'react-icons/ri';
import { IoCloseOutline } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux'; // Комбіновані імпорти
import { FaRegTrashCan } from "react-icons/fa6";
import { removeFromCart } from '../slices/cartSlices'; // Правильний шлях імпорту

const CartOffset = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useSelector(state => state.cart.items);
  const totalQuantity = useSelector(state => state.cart.totalQuantity); // Отримуємо загальну кількість товарів
  
  const dispatch = useDispatch(); 
  
  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id)); // Виклик дії видалення товару
  };

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        className="bg-lime-100 h-10 w-10 flex justify-center items-center rounded-full relative"
        onClick={toggleCart}
      >
        <RiShoppingCartLine />
        {/* Індикатор кількості товарів у кошику */}
        {totalQuantity > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
            {totalQuantity}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="w-full fixed top-0 right-0 h-screen z-50">
          <div className="h-full w-full fixed top-0 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border"></div>
          
          <div className="bg-white z-[100] w-full max-w-sm h-full ml-auto relative">
            <button
              className="absolute top-4 right-4 p-3"
              onClick={toggleCart}
            >
              <IoCloseOutline />
            </button>
            <div className="p-4">
              <h1 className="text-lg font-bold">Ваш кошик</h1>
            </div>
            <div className="w-full p-3">
              <ul>
                {cartItems.length > 0 ? (
                  cartItems.map(item => (
                    <li key={item.id} className='flex group cursor-pointer justify-center bg-gray-50 px-2 py-3 gap-4 items-center'>
                      <div className='w-24 h-24 overflow-hidden'>
                        <img src={item.image} alt={item.name} className='w-full h-full object-cover' />
                      </div>
                      <div className='ml-2'>
                        <h2 className='font-bold text-lg'>{item.name}</h2>
                        <h4 className='text-lime-500 text-sm py-2'>${item.price}</h4>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button onClick={() => handleRemoveItem(item.id)} className="text-red-500">
                          <FaRegTrashCan />
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className='flex justify-center py-3'>
                    <h2 className='text-gray-500'>Ваш кошик порожній</h2>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartOffset;
