import React, { useEffect, useState } from 'react';
import ProductCard from '../components/home/ProductCard';
import SortDropDown from '../components/shop/SortDropDown';

const ProductList = () => {
  const [initialProducts, setInitialProducts] = useState([]);
  const [data, setData] = useState([]); 

  useEffect(() => {
    fetch('/img/Hero_Slider/Products/products.json')
      .then(res => res.json())
      .then(data => {
        setInitialProducts(data.products);
        setData(data.products); 
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <div className="flex justify-end items-center w-full"></div>
      <SortDropDown products={initialProducts} setSortedData={setData} />
      <div className="py-3">
        <div className="flex flex-wrap justify-center">
          {data.length > 0 && data.map((product) => ( 
            <div key={product.id} className="p-1">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
