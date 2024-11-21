'use client';
import React from 'react';
import rawgApi from '@/api';
import { useQuery } from '@tanstack/react-query';
import { Creator } from '@/shared/types';

const CreatorsList: React.FC = () => {
  const {isPending, isError, data, error} = useQuery({
    queryKey: ['creators'],
    queryFn: () => rawgApi('/creators'),
    staleTime: 1000 * 60,
    // @ts-ignore
    cacheTime: 1000 * 60 * 10,
  });

  const creators = data && data.data.results;

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    console.log('Error caught:', error.message); // Log the error message
    return <span role="alert">Error: {error.message}</span>;
  }

  return (
    <ul className="md:grid md:grid-cols-3 md:gap-2 items-stretch pt-2">
      {creators && creators.map((creator: Creator) => (
        <li key={creator.id}>
          <h2 className="mb-1 text-gray-700">{creator.name}</h2>
          <img className="w-full md:w-[200px] mb-1" src={creator.image} alt={creator.name}/>
          <p className="text-gray-700">{`Games count: ${creator.games_count}`}</p>
        </li>
      ))}
    </ul>
  );
};

export default CreatorsList;
