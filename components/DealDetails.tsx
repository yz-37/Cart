
import React from 'react';
import { Deal } from '../types';
import CountdownTimer from './ui/CountdownTimer';
import Button from './ui/Button';

interface DealDetailsProps {
  deal: Deal;
  onBack: () => void;
}

const DealDetails: React.FC<DealDetailsProps> = ({ deal, onBack }) => {
  const currentPriceTier = deal.priceTiers.find(tier => deal.participants >= tier.quantity) || deal.priceTiers[0];
  const nextPriceTier = deal.priceTiers.find(tier => tier.quantity > deal.participants);

  const calculateSavings = (current: number, original: number) => {
    return original - current;
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] pb-20 relative">
      <div className="relative">
        <img
          src={deal.imageUrl}
          alt={deal.name}
          className="w-full h-72 object-cover"
        />
        <button
          onClick={onBack}
          className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md z-10 hover:bg-gray-100 active:scale-95 transition-all duration-200"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
      </div>

      <div className="bg-white rounded-t-3xl p-6 -mt-8 relative shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{deal.name}</h1>
        <p className="text-gray-600 mb-4">{deal.description}</p>

        <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4 mb-4 shadow-sm">
          <div className="text-lg font-semibold text-gray-700">
            剩餘時間:
          </div>
          <CountdownTimer endTime={deal.endTime} className="text-[#FF6B00] text-xl font-bold" />
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-4">動態價格表</h2>
        <div className="bg-gray-50 rounded-xl p-4 shadow-sm mb-6">
          <div className="flex justify-between items-baseline mb-2 pb-2 border-b border-gray-200">
            <span className="text-lg text-gray-700">目前價格:</span>
            <span className="text-3xl font-bold text-[#FF6B00]">
              NT$ {deal.currentPrice}
            </span>
          </div>
          <div className="text-base text-gray-600 mb-3">
            已有 <span className="font-semibold text-[#FF6B00]">{deal.participants}</span> 人參團
          </div>

          {nextPriceTier ? (
            <div className="bg-orange-50 border-l-4 border-[#FF6B00] p-3 rounded-md text-gray-700">
              <p className="font-medium">
                再 <span className="font-bold text-[#FF6B00]">{nextPriceTier.quantity - deal.participants}</span> 人參團，價格可再降
                <span className="font-bold text-[#FF6B00]"> NT$ {calculateSavings(nextPriceTier.price, deal.currentPrice)}</span>
              </p>
              <p className="text-sm">目標 {nextPriceTier.quantity} 人，達成價 NT$ {nextPriceTier.price}</p>
            </div>
          ) : (
            <div className="bg-green-50 border-l-4 border-green-600 p-3 rounded-md text-gray-700">
              <p className="font-medium">已達最低價格！</p>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg border-t border-gray-100 flex justify-center items-center z-20">
        <Button fullWidth size="lg" className="py-3">
          我要參團
        </Button>
      </div>
    </div>
  );
};

export default DealDetails;
