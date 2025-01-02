import React from 'react';
import { useSelector} from 'react-redux';


const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlist.items);

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className="w-11/12 py-3 min-h-[50vh]">
        <table className='w-full h-full'>
          <thead className='bg-gray-300'>
            <tr className='font-bold'>
              <th className='py-3'>ID</th>
              <th className='py-3'>Name</th>
              <th className='py-3'>Price</th>
            </tr>
          </thead>
          <tbody className='bg-gray-50'>
            {wishlistItems.length > 0 ? (
              wishlistItems.map((item) => (
                <tr key={item.id} className='hover:bg-green-200 text-center'>
                  <td className='py-3'>{item.id}</td>
                  <td className='py-3'>{item.name}</td>
                  <td className='py-3'>${item.price.toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-3">Ваш список бажань порожній</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Wishlist;
