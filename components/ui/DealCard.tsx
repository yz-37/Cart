
import React from 'react';
import { Deal } from '../../types';
import ProgressBar from './ProgressBar';
import CountdownTimer from './CountdownTimer';

interface DealCardProps {
  deal: Deal;
  onClick: (dealId: string) => void;
}

const DealCard: React.FC<DealCardProps> = ({ deal, onClick }) => {
  const progress = (deal.participants / deal.targetParticipants) * 100;

  return (
    <div
      className="flex-none w-64 mr-4 bg-white rounded-xl shadow-md overflow-hidden cursor-pointer active:scale-95 transition-all duration-200"
      onClick={() => onClick(deal.id)}
    >
      <img
        src={deal.imageUrl}
        alt={deal.name}
        className="w-full h-32 object-cover"
      />
      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-800 mb-1 line-clamp-2">
          {deal.name}
        </h3>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <span>剩餘時間: </span>
          <CountdownTimer endTime={deal.endTime} className="text-gray-700 font-medium" />
        </div>
        <ProgressBar progress={progress} className="mb-2" />
        <p className="text-sm text-gray-600 text-right">
          達成率: <span className="font-semibold text-[#FF6B00]">{progress.toFixed(0)}%</span>
        </p>
      </div>
    </div>
  );
};

export default DealCard;
