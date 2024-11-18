import React, { useEffect, useState } from 'react';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import LoginButton from '@/components/LoginButton';
import Payment from '@/components/Payment';
import GamesList from '@/components/GamesList';
import StoresList from '@/components/StoresList';
import CreatorsList from '@/components/CreatorsList';

const tabs = ['Games list', 'Stores list', 'Creators list'];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isAuth, setIsAuth] = useState(() => {
    const storedLoginData = localStorage.getItem('loginData');
    return !!storedLoginData;
  });

  useEffect(() => {
    const handleLoginDataChange = (event: StorageEvent) => {
      if (event.key === 'loginData') {
        const updatedLoginData = localStorage.getItem('loginData');
        setIsAuth(!!updatedLoginData);
      }
    };

    window.addEventListener('storage', handleLoginDataChange);

    return () => {
      window.removeEventListener('storage', handleLoginDataChange);
    };
  }, []);

  const handleAuthUpdate = () => {
    const updatedLoginData = localStorage.getItem('loginData');
    setIsAuth(!!updatedLoginData);
  };

  const handleSetActiveTab = (index: number) => () => {
    setActiveTab(index);
  }

  // for this simple app we don't need to use routes

  return (
    <div
      className="bg-white relative px-3 md:p-5 w-lvw h-lvh rounded-0 md:rounded-xl md:fixed md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[600px] md:h-auto md:min-h-[400px] md:w-full">
      {!isAuth ?
        <div className="absolute max-width-[320px] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          <h2 className="text-gray-500 font-light text-4xl text-center mb-3">Sign in</h2>
          <LoginButton onAuthUpdate={handleAuthUpdate}/>
        </div>
        :
        <>
          <Payment/>
          <Tabs>
            <TabList>
              {tabs && tabs.map((tab: string, index: number) => (
                <Tab onClick={handleSetActiveTab(index)}
                  className={`inline-block border-[1px] focus:outline-0 mb-[-1px] border-gray-700 rounded-t-lg mx-2 py-1 px-2 cursor-pointer ${activeTab == index && 'border-b-white'}`}>{tab}</Tab>
              ))}
            </TabList>
            <div className="content-container border-t-[1px] border-gray-700 overflow-auto md:max-h-[200px]">
              <TabPanel>
                <GamesList/>
              </TabPanel>
              <TabPanel>
                <StoresList/>
              </TabPanel>
              <TabPanel>
                <CreatorsList/>
              </TabPanel>
            </div>
          </Tabs>
        </>
      }
    </div>
  );
};

export default App;
