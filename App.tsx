
import React, { useState } from 'react';
import DiscoveryFeed from './components/DiscoveryFeed';
import DealDetails from './components/DealDetails';
import HostDashboard from './components/HostDashboard';
import { Page } from './types';
import { MOCK_DEAL_DETAILS, MOCK_HOT_DEALS, MOCK_NEARBY_DEALS } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Discovery);
  const [selectedDealId, setSelectedDealId] = useState<string | null>(null);

  const navigateToDeal = (dealId: string) => {
    setSelectedDealId(dealId);
    setCurrentPage(Page.DealDetails);
  };

  const navigateBack = () => {
    setSelectedDealId(null);
    setCurrentPage(Page.Discovery);
  };

  const navigateToHostDashboard = () => {
    setCurrentPage(Page.HostDashboard);
  };

  const renderContent = () => {
    if (currentPage === Page.Discovery) {
      return <DiscoveryFeed onNavigateToDeal={navigateToDeal} />;
    } else if (currentPage === Page.DealDetails && selectedDealId) {
      // Find the deal from mock data, combining hot and nearby for lookup
      const allMockDeals = [...MOCK_HOT_DEALS, ...MOCK_NEARBY_DEALS, MOCK_DEAL_DETAILS];
      const deal = allMockDeals.find(d => d.id === selectedDealId);
      if (deal) {
        return <DealDetails deal={deal} onBack={navigateBack} />;
      }
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#F3F4F6] p-4">
          <p className="text-xl text-gray-700 mb-4">找不到團購資訊。</p>
          <button
            onClick={navigateBack}
            className="px-6 py-3 bg-[#FF6B00] text-white rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-200"
          >
            返回首頁
          </button>
        </div>
      );
    } else if (currentPage === Page.HostDashboard) {
      return <HostDashboard onBack={navigateBack} />;
    }
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F3F4F6] p-4">
        <p className="text-xl text-gray-700 mb-4">頁面未找到。</p>
        <button
          onClick={navigateBack}
          className="px-6 py-3 bg-[#FF6B00] text-white rounded-xl shadow-md hover:bg-orange-600 transition-colors duration-200"
        >
          返回首頁
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-md mx-auto min-h-screen shadow-lg bg-[#F3F4F6] overflow-hidden relative">
      {renderContent()}

      {/* Persistent Call-to-Action / Navigation for Discovery and Host Dashboard */}
      {(currentPage === Page.Discovery || currentPage === Page.HostDashboard) && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg border-t border-gray-100 flex justify-around items-center z-20 max-w-md mx-auto">
          <button
            onClick={() => setCurrentPage(Page.Discovery)}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors duration-200 ${
              currentPage === Page.Discovery ? 'text-[#FF6B00]' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              ></path>
            </svg>
            <span className="text-xs mt-1">首頁</span>
          </button>

          <button
            onClick={navigateToHostDashboard}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors duration-200 ${
              currentPage === Page.HostDashboard ? 'text-[#FF6B00]' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m7 0V5a2 2 0 00-2-2H7a2 2 0 00-2 2v6m7 0v-2a3 3 0 00-3-3H9a3 3 0 00-3 3v2"
              ></path>
            </svg>
            <span className="text-xs mt-1">團購主</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
