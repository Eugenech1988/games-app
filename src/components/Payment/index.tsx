import React, { useEffect, useState } from 'react';
import diamondIcon from '@/assets/diamond-icon.svg';

const Payment: React.FC = () => {
  const [diamonds, setDiamonds] = useState(() => {
    const storedDiamonds = localStorage.getItem('diamondsAmount');
    return storedDiamonds ? parseInt(storedDiamonds, 10) : 0;
  });

  const handleAddDiamonds = () => {
    const newDiamondsAmount = diamonds + 10;
    setDiamonds(newDiamondsAmount);
    localStorage.setItem('diamondsAmount', newDiamondsAmount.toString());
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedDiamonds = localStorage.getItem('diamondsAmount');
      setDiamonds(updatedDiamonds ? parseInt(updatedDiamonds, 10) : 0);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className='text-center pt-3 md:pt-0'>
      <h2 className="text-gray-500 font-light text-3xl mb-1">Set your payment</h2>
      <p className='text-gray-700 font-light text-xl mb-2'>{`Current amount: ${diamonds}`}</p>
      <button
        className='flex justify-between mx-auto items-center bg-blue-500 px-4 rounded-full font-light text-white uppercase text-md leading-[40px] hover:bg-blue-400 transition duration-300 mb-4'
        onClick={handleAddDiamonds}>
        <span className='mr-2'>purchase 10 diamonds</span>
        <img className='w-[20px] h-auto' src={diamondIcon} alt=""/>
      </button>
    </div>
  );
};

export default Payment;
