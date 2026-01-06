
import React, { useState } from 'react';
import { MOCK_HOT_DEALS, MOCK_NEARBY_DEALS } from '../constants';
import DealCard from './ui/DealCard';
import NearbyDealItem from './ui/NearbyDealItem';
import { Page } from '../types';

interface DiscoveryFeedProps {
  onNavigateToDeal: (dealId: string) => void;
}

const DiscoveryFeed: React.FC<DiscoveryFeedProps> = ({ onNavigateToDeal }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredHotDeals = MOCK_HOT_DEALS.filter(deal =>
    deal.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredNearbyDeals = MOCK_NEARBY_DEALS.filter(deal =>
    deal.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 bg-[#F3F4F6] min-h-screen">
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="搜尋團購商品..."
          className="w-full pl-10 pr-4 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00] text-gray-700 bg-white placeholder-gray-400"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <svg
          className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>

      <h2 className="text-lg font-bold text-gray-800 mb-4 px-1">熱門團購</h2>
      <div className="flex overflow-x-auto no-scrollbar pb-4 -mx-4 px-4">
        {filteredHotDeals.map((deal) => (
          <DealCard key={deal.id} deal={deal} onClick={onNavigateToDeal} />
        ))}
        {filteredHotDeals.length === 0 && (
          <p className="text-gray-500 text-center w-full">沒有找到熱門團購商品。</p>
        )}
      </div>

      <h2 className="text-lg font-bold text-gray-800 mb-4 px-1 pt-4">鄰近團購</h2>
      <div className="space-y-3">
        {filteredNearbyDeals.map((deal) => (
          <NearbyDealItem key={deal.id} deal={deal} onClick={onNavigateToDeal} />
        ))}
        {filteredNearbyDeals.length === 0 && (
          <p className="text-gray-500 text-center w-full">沒有找到鄰近團購商品。</p>
        )}
      </div>
    </div>
  );
};

export default DiscoveryFeed;
