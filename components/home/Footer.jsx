import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className="w-11/12 py-5"> 
        <footer className='w-full bg-gray-200 py-8 px-4 text-gray-700'>
            <div className="container mx-auto grid grid-cols-4 gap-6">
                {/* Ліва колонка */}
                <div className="flex flex-col">
                    <h1 className="font-bold text-xl">Furniture</h1>
                    <p className='text-sm text-gray-600 italic py-3'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto sapiente ducimus.
                    </p>
                    <p className='text-xs'>&copy; Усі права захищені.</p>
                </div>

                {/* Середня колонка 1 */}
                <div className="flex flex-col">
                    <h2 className="font-bold text-lg mb-4">Швидкі посилання</h2>
                    <ul className='space-y-2'>
                        <li className='hover:text-lime-500 cursor-pointer'>Головна</li>
                        <li className='hover:text-lime-500 cursor-pointer'>Про нас</li>
                        <li className='hover:text-lime-500 cursor-pointer'>Контакти</li>
                        <li className='hover:text-lime-500 cursor-pointer'>Магазин</li>
                    </ul>
                </div>

                {/* Середня колонка 2 */}
                <div className="flex flex-col">
                    <h2 className="font-bold text-lg mb-4">Умови використання</h2>
                    <ul className='space-y-2'>
                        <li className='hover:text-lime-500 cursor-pointer'>Умови використання</li>
                        <li className='hover:text-lime-500 cursor-pointer'>Політика конфіденційності</li>
                        <li className='hover:text-lime-500 cursor-pointer'>Умови угоди</li>
                    </ul>
                </div>

                {/* Соціальні мережі */}
                <div className="flex flex-col items-start">
                    <h2 className="font-bold text-lg mb-4">Соціальні мережі</h2>
                    <div className="flex space-x-3">
                        <div className="w-8 h-8 bg-black flex items-center justify-center rounded-full cursor-pointer">
                            <FaFacebookF className="text-white" />
                        </div>
                        <div className="w-8 h-8 bg-black flex items-center justify-center rounded-full cursor-pointer">
                            <FaInstagram className="text-white" />
                        </div>
                        <div className="w-8 h-8 bg-black flex items-center justify-center rounded-full cursor-pointer">
                            <FaTwitter className="text-white" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        </div>
    );
};

export default Footer;
