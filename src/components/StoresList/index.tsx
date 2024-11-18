import React, { useEffect, useState } from 'react';
import rawgApi from '@/api';
import { Store } from '@/shared/types.ts';

const StoresList: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await rawgApi.get('/stores', {params: {page_size: 15}});
        setStores(response.data.results);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchStores();
  }, []);

  const handleStoreClick = (domain: string) => () => {
    window.open(`http://${domain}/`);
  };

  return (
    <ul className="md:grid md:grid-cols-3 md:gap-2 items-stretch pt-2">
      {stores && stores.map((store) => (
        <li className="cursor-pointer mb-2 md:mb-0" key={store.id}
            onClick={handleStoreClick(store.domain)}>
          <h2 className="mb-1 text-gray-700">{store.name}</h2>
          <img className="w-full md:w-[200px] mb-1" src={store.image_background} alt={store.name}/>
          <p className="text-gray-700">{store.domain}</p>
        </li>
      ))}
    </ul>);
};

export default StoresList;
