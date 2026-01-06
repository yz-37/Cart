
import React, { useMemo } from 'react';
import { MOCK_ORDERS } from '../constants';
import Button from './ui/Button';
import { Order } from '../types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface HostDashboardProps {
  onBack: () => void;
}

const HostDashboard: React.FC<HostDashboardProps> = ({ onBack }) => {
  const pendingOrders = MOCK_ORDERS.filter(order => order.status === 'pending');

  const totalOrderAmount = useMemo(() => {
    return MOCK_ORDERS.reduce((sum, order) => sum + order.totalAmount, 0);
  }, []);

  const chartData = useMemo(() => {
    const dailySales: { [key: string]: number } = {};
    MOCK_ORDERS.forEach(order => {
      const date = new Date(order.orderDate).toISOString().split('T')[0];
      dailySales[date] = (dailySales[date] || 0) + order.totalAmount;
    });

    return Object.keys(dailySales)
      .sort()
      .map(date => ({
        date,
        amount: dailySales[date],
      }));
  }, []);

  const handleExportOrders = () => {
    alert('訂單已導出！(模擬功能)');
    // In a real app, this would trigger a download of a CSV/Excel file.
  };

  const formatCurrency = (value: number) => `NT$ ${value.toLocaleString()}`;

  return (
    <div className="min-h-screen bg-[#F3F4F6] p-4 sm:p-6 pb-20 relative">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 active:scale-95 transition-all duration-200 mr-4"
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
        <h1 className="text-2xl font-bold text-gray-800">團購主儀表板</h1>
      </div>

      <div className="bg-white rounded-xl shadow-md p-5 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">總訂單金額</h2>
        <p className="text-4xl font-bold text-[#FF6B00] mb-4">NT$ {totalOrderAmount.toLocaleString()}</p>

        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="date" stroke="#6b7280" tickFormatter={(dateStr) => new Date(dateStr).toLocaleDateString('zh-TW', { month: 'numeric', day: 'numeric' })} />
            <YAxis stroke="#6b7280" tickFormatter={formatCurrency} />
            <Tooltip formatter={formatCurrency} labelFormatter={(label) => `日期: ${label}`} />
            <Line type="monotone" dataKey="amount" stroke="#FF6B00" strokeWidth={2} dot={{ stroke: '#FF6B00', strokeWidth: 2, r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl shadow-md p-5 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">待處理訂單</h2>
        {pendingOrders.length === 0 ? (
          <p className="text-gray-500 text-center">目前沒有待處理訂單。</p>
        ) : (
          <div className="space-y-3">
            {pendingOrders.map((order) => (
              <div key={order.id} className="bg-gray-50 rounded-lg p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-sm">
                <div>
                  <p className="font-medium text-gray-800">{order.dealName}</p>
                  <p className="text-sm text-gray-600">
                    買家: {order.buyerName} | 數量: {order.quantity} | 金額: NT${order.totalAmount}
                  </p>
                </div>
                <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full mt-2 sm:mt-0">
                  {order.status === 'pending' ? '待處理' : '已完成'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg border-t border-gray-100 flex justify-center items-center z-20">
        <Button fullWidth size="lg" onClick={handleExportOrders} className="py-3">
          一鍵導出訂單
        </Button>
      </div>
    </div>
  );
};

export default HostDashboard;
