import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

const BestSeller = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/img/Hero_Slider/Products/products.json') 
            .then(res => res.json()) 
            .then(data => setData(data.products)) 
            .catch(error => console.log(error));
    }, []); 

    return (
        <div className="py-3">
            <div className="flex flex-wrap justify-center">
                {data.length > 0 && data.slice(3,6).map((product) => ( 
                    <div key={product.id} className="p-1">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
            <div className="flex w-full justify-center my-6">
                <button className="bg-lime-400 hover:bg-lime-500 text-white py-2 px-4 rounded">
                    View More
                </button>
            </div>
        </div>
    );
};

export default BestSeller;
