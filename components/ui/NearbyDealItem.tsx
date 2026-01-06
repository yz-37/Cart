
import React from 'react';
import { Deal } from '../../types';

interface NearbyDealItemProps {
  deal: Deal;
  onClick: (dealId: string) => void;
}

const NearbyDealItem: React.FC<NearbyDealItemProps> = ({ deal, onClick }) => {
  return (
    <div
      className="flex items-center bg-white rounded-xl shadow-sm p-3 mb-3 cursor-pointer active:scale-[0.98] transition-all duration-200"
      onClick={() => onClick(deal.id)}
    >
      <img
        src={deal.imageUrl}
        alt={deal.name}
        className="w-16 h-16 object-cover rounded-lg mr-3 flex-none"
      />
      <div className="flex-grow">
        <h3 className="text-base font-semibold text-gray-800 line-clamp-1">{deal.name}</h3>
        <p className="text-sm text-gray-600">
          目前價: <span className="text-[#FF6B00] font-bold">NT${deal.currentPrice}</span>
        </p>
      </div>
      <div className="flex-none text-right ml-4">
        {deal.distanceKm && (
          <p className="text-sm text-gray-500 mb-1">{deal.distanceKm.toFixed(1)} km</p>
        )}
        {deal.savingsAmount && (
          <p className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full inline-block">
            省下 NT${deal.savingsAmount}
          </p>
        )}
      </div>
    </div>
  );
};

export default NearbyDealItem;
