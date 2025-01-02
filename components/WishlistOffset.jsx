import React, { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { FiHeart } from "react-icons/fi";
import { FaRegTrashCan } from "react-icons/fa6"; 
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishlist } from '../slices/wishlistSlice'; 

const WishlistOffset = () => {
  const [isOpen, setIsOpen] = useState(false);
  const wishlistItems = useSelector(state => state.wishlist.items); // Отримання елементів списку бажань
  const dispatch = useDispatch();

  const toggleWishlist = () => {
    setIsOpen(!isOpen);
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromWishlist(id)); // Видалення товару зі списку бажань
  };

  return (
    <div>
      <button
        className="bg-lime-100 h-10 w-10 flex justify-center items-center rounded-full relative"
        onClick={toggleWishlist}
      >
        <FiHeart />
        {/* Індикатор кількості товарів у списку бажань */}
        {wishlistItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
            {wishlistItems.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="w-full fixed top-0 right-0 h-screen z-50">
          <div className="h-full w-full fixed top-0 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border"></div>
          
          <div className="bg-white z-[100] w-full max-w-sm h-full ml-auto relative">
            <button
              className="absolute top-4 right-4 p-3"
              onClick={toggleWishlist}
            >
              <IoCloseOutline />
            </button>
            <div className="p-4">
              <h1 className="text-lg font-bold">Ваш список бажань</h1>
            </div>
            <div className="w-full p-3">
              <ul>
                {wishlistItems.length > 0 ? (
                  wishlistItems.map(item => (
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
                    <h2 className='text-gray-500'>Ваш список бажань порожній</h2>
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

export default WishlistOffset;
