'use client'
import React from 'react';
import Image from 'next/image';
import rawgApi from '@/api';
import { useQuery } from '@tanstack/react-query';
import { Store } from '@/shared/types';

const StoresList: React.FC = () => {
  const {isPending, isError, data, error} = useQuery({
    queryKey: ['stores'],
    queryFn: () => rawgApi('/stores'),
    staleTime: 1000 * 60,
    // @ts-ignore
    cacheTime: 1000 * 60 * 10,
  });

  const stores = data && data.data.results;

  if (isPending) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const handleStoreClick = (domain: string) => () => {
    window.open(`http://${domain}/`);
  };

  return (
    <ul className="md:grid md:grid-cols-3 md:gap-2 items-stretch pt-2">
      {stores && stores.map((store: Store) => (
        <li className="cursor-pointer mb-2 md:mb-0" key={store.id}
            onClick={handleStoreClick(store.domain)}>
          <h2 className="mb-1 text-gray-700">{store.name}</h2>
          <Image
            className="w-full md:w-[200px] mb-1"
            src={store.image_background}
            alt={store.name}
          />
          <img className="w-full md:w-[200px] mb-1" src={store.image_background} alt={store.name}/>
          <p className="text-gray-700">{store.domain}</p>
        </li>
      ))}
    </ul>);
};

export default StoresList;
