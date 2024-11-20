'use client';
import React, { useState } from 'react';
import Login from '@/components/Login';
import { Tabs, Tab, TabPanel, TabList } from 'react-tabs';
import { useAppSelector } from '@/lib/hooks';
import Payment from '@/components/Payment';
import GamesList from '@/components/GamesList';
import StoresList from '@/components/StoresList';
import CreatorsList from '@/components/CreatorsList';

const tabs = ['Games list', 'Stores list', 'Creators list'];

const PageInner: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const login = useAppSelector(state => state.login.id);

  const handleSetActiveTab = (index: number) => () => {
    setActiveTab(index);
  }
  return (
    <>
      <Login/>
      {(login !== '') &&
        <>
          <Payment/>
          <div className="content-container overflow-y-auto md:max-h-[200px]">
            <Tabs>
              <TabList className='border-b-[1px] border-gray-700 '>
                {tabs && tabs.map((tab: string, index: number) => (
                  <Tab onClick={handleSetActiveTab(index)} key={index}
                       className={`inline-block border-[1px] focus:outline-0 mb-[-1px] border-gray-700 rounded-t-lg mx-2 py-1 px-2 cursor-pointer ${activeTab == index && 'border-b-white'}`}>{tab}</Tab>
                ))}
              </TabList>
              <TabPanel>
                <GamesList/>
              </TabPanel>
              <TabPanel>
                <StoresList/>
              </TabPanel>
              <TabPanel>
                <CreatorsList/>
              </TabPanel>
            </Tabs>
          </div>
        </>
      }
    </>
  );
};

export default PageInner;
