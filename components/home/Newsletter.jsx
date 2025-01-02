import React from 'react';

const Newsletter = () => {
    return (
        <div className='w-full bg-grey-200 h-full py-14 px-2 flex justify-center items-center'>
            <div className='max-w-md w-full'>
                <h1 className='py-5 font-bold text-3xl'>Subscribe for Exclusive Updates</h1>
                <div className='flex w-full'>
                    <input
                        className='w-full border border-gray-400 h-10'
                        type="email"
                        name="newsletteremail"
                        placeholder="Enter your email"
                    />
                    <button className='bg-black hover:bg-slate-900 translate-all duration-300 ease-in text-white px-5'>Відправити</button>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;
