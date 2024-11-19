'use client';
import React from 'react';
import { addPayment } from '@/lib/slices/loginSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

const Payment: React.FC = () => {
  const dispatch = useAppDispatch();
  const payment = useAppSelector(state => state.login.payment);
  // only for this time
  const handleAddDiamonds = () => {
    const updatedPayment = (payment || 0) + 10;
    dispatch(addPayment(updatedPayment));
  };

  return (
    <div className='text-center md:pt-0'>
      <h2 className="text-gray-500 font-light text-3xl mb-1">Set your payment</h2>
      <p className='text-gray-700 font-light text-xl mb-2'>{`Current amount: ${payment ? payment : '0'}`}</p>
      <button
        className='flex justify-between mx-auto items-center bg-blue-500 px-4 rounded-full font-light text-white uppercase text-md leading-[40px] hover:bg-blue-400 transition duration-300 mb-4'
        onClick={handleAddDiamonds}>
        <span className='mr-2'>purchase 10 diamonds</span>
        <img className='w-[20px] h-auto' src='/diamond-icon.svg' alt=""/>
      </button>
    </div>
  );
};

export default Payment;
