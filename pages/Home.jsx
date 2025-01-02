import React from 'react';
import Slider from '../components/home/Slider';
import Categories from '../components/home/Category'; 
import FeaturedProducts from '../components/home/FeaturedProducts';
import OfferBanners from '../components/home/OfferBanners';
import BestSeller from '../components/home/BestSeller'; 
import Newsletter from '../components/home/Newsletter';
 

function Home() {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="w-full flex justify-center items-center">
                <Slider />
            </div>
            <div className="w-11/12 py-5"> 
                <h1 className='title font-bold text-3xl'>
                  Знайди стиль: Категорії меблів
                </h1>
                <Categories /> 
            </div>
            <div className="w-11/12 py-5"> 
                <h1 className='title font-bold text-center text-3xl'>
                Огляд наших рекомендованих продуктів
                </h1>
                <FeaturedProducts /> 
            </div>
            <div className="w-11/12 py-5"> 
                <OfferBanners /> 
            </div>
            <div className="w-11/12 py-5"> 
                <h1 className='title font-bold text-center text-3xl'>
                Огляд наших найкращих продажів
                </h1>
                <BestSeller /> 
            </div>
            <div className="w-11/12 py-5"> 
          
                <Newsletter /> 
            </div>
          
          
          
 
        </div>
    );
}

export default Home;
