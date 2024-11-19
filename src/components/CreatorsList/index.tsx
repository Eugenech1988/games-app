'use client';
import React, { useEffect } from 'react';
import rawgApi from '@/api';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { addCreators } from '@/lib/slices/contentSlice';

const CreatorsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const creators = useAppSelector(state => state.content.creators);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const response = await rawgApi.get('/creators', {params: {page_size: 15}});
        dispatch(addCreators(response.data.results));
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };
    if (!creators.length)
      fetchCreators();
  }, []);
  return (
    <ul className="md:grid md:grid-cols-3 md:gap-2 items-stretch pt-2">
      {creators && creators.map((creator) => (
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
