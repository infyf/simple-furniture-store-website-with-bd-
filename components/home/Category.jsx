import React, { useState, useEffect } from 'react';

const Categories = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/img/Hero_Slider/Categories/Categories.json')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(error => console.log("Помилка:", error));
    }, []);

    return (
        <div className="w-full grid grid-cols-8 gap-3 py-5 px-2">
            {data.length > 0 ? (
                data.map((category, index) => (
                    <div className="flex flex-col h-28 w-30 justify-center items-center p-3 rounded-full bg-lime-200 hover:bg-lime-400 cursor-pointer transition-all duration-500 ease-linear" key={index}>
                        <img src={category.image} alt={category.name} className='w-10 h-10'/>
                        <h1 className='text-sm text-center font-bold py-2  text-nowrap'>{category.name}</h1>
                    </div>
                ))
            ) : (
                <p>Завантаження категорій...</p>
            )}
        </div>
    );
};

export default Categories;
