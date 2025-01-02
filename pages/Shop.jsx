import React from 'react'
import ProductList from './ProductList';



function Shop() {
    return (
        <div className='w-full h-full flex justify-center items-center'>
            <div className='w-11/12 py-4'>
                <ProductList/>
            </div>
        </div>
    );
}

export default Shop
