'use client';
import React, { useState } from 'react';
import rawgApi from '@/api';
import GameModal from '@/components/GameModal';
import { Game } from '@/shared/types';
import { useQuery } from '@tanstack/react-query';

const GamesList: React.FC = () => {
  const [gameDetails, setGameDetails] = useState<Game | null>(null);
  const [isGameModalOpen, setIsGameModalOpen] = useState<boolean>(false);

  const {isPending, isError, data, error} = useQuery({
    queryKey: ['games'],
    queryFn: () => rawgApi('/games'),
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60 * 10,
  });

  const games = data && data.data.results;

  if (isPending) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const handleGameClick = (game: Game) => () => {
    setIsGameModalOpen(true);
    setGameDetails(game);
  };

  const closeGameModal = () => {
    setGameDetails(null);
    setIsGameModalOpen(false);
  };

  const renderModalListItems = (heading: string, items: string[]) => (
    <>
      <p className="text-gray-900 mb-1 text-lg font-medium">{heading}</p>
      <ul>
        {items.map((item, index) => <li
          key={index}
          className="text-white inline-block mr-2 mb-2 py-1 rounded-full px-4 bg-gray-500"
        >{item}</li>)}
      </ul>
    </>
  );

  return (
    <>
      {isGameModalOpen && gameDetails &&
        <GameModal onClose={closeGameModal}>
          <h2 className="text-gray-900 font-medium text-xl mb-2">{gameDetails.name}</h2>
          <h2 className="text-gray-900 text-lg mb-2 font-medium">{`Released: ${gameDetails.released}`}</h2>
          <img className="max-w-[600px] w-full mb-2" src={gameDetails.background_image} alt=""/>
          <div className="max-h-[200px] max-w-[600px] overflow-y-auto">
            {renderModalListItems('Platforms:', gameDetails.platforms.map(platform => (platform.platform.name)))}
            {renderModalListItems('Genres:', gameDetails.genres.map(genre => (genre.name)))}
            {renderModalListItems('Tags::', gameDetails.tags.map(tag => (tag.name)))}
            {renderModalListItems('Stores:', gameDetails.stores.map(store => (store.store.name)))}
          </div>
        </GameModal>
      }
      <ul className="md:grid md:grid-cols-3 md:gap-2 items-stretch pt-2">
        {games && games.map((game) => (
          <li onClick={handleGameClick(game)} className="cursor-pointer mb-2 md:mb-0" key={game.id}>
            <h2 className="mb-1 text-gray-700">{game.name}</h2>
            <img className="w-full md:w-[200px] mb-1" src={game.background_image} alt={game.name}/>
            <p className="text-gray-700">Released: {game.released}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default GamesList;
