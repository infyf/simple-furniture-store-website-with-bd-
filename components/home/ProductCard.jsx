import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegEye, FaRegHeart } from "react-icons/fa";
import { addToCart } from '../../slices/cartSlices';
import { addToWishlist, removeFromWishlist } from '../../slices/wishlistSlice'; 

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const wishlistItems = useSelector(state => state.wishlist.items); // Доступ до списку бажань
    
    const isInWishlist = wishlistItems.some(item => item.id === product.id); // Перевірка, чи є товар у списку бажань

    const handleAddToCart = () => {
        dispatch(addToCart(product)); // Додаємо товар до кошика
    };

    const handleWishlistToggle = () => {
        if (isInWishlist) {
            dispatch(removeFromWishlist(product.id)); // Якщо товар є у списку бажань, видаляємо його
        } else {
            dispatch(addToWishlist(product)); // Якщо товару немає, додаємо його до списку бажань
        }
    };

    return (
        <div className='w-full max-w-sm mx-auto group h-full'>
            <div className='relative overflow-hidden'>
                <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className='w-full h-auto'
                />
                <div className="absolute top-2 right-2 flex flex-col gap-3 p-2">
                    <button 
                        onClick={handleWishlistToggle} 
                        className={`transition duration-200 ease transform p-2 ${isInWishlist ? 'bg-red-400' : 'bg-lime-200'} hover:bg-lime-400`}>
                        <FaRegHeart />
                    </button>
                    <button className='bg-lime-200 transition duration-200 ease transform hover:bg-lime-400 p-2'>
                        <FaRegEye />
                    </button>
                </div>
                <div className="absolute -bottom-28 group-hover:bottom-2 transition-all duration-500 ease-in-out w-full flex justify-center px-4">
                    <button 
                        onClick={handleAddToCart} 
                        className='w-11/12 block mx-auto bg-lime-400 py-2'
                    >
                        Додати до кошика
                    </button>
                </div>
            </div>

            <div className='py-3'>
                <div className="flex justify-between items-center">
                    <h1 className='font-bold'>{product.name}</h1>
                    <h4 className='font-bold text-lime-500'>$ {product.price}</h4>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
