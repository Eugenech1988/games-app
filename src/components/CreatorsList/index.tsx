import React, { useEffect, useState } from 'react';
import rawgApi from '@/api';
import { Creator } from '@/shared/types.ts';

const CreatorsList: React.FC = () => {
  const [creators, setCreators] = useState<Creator[]>([]);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const response = await rawgApi.get('/creators', {params: {page_size: 15}});
        setCreators(response.data.results);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

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
