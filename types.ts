
export enum Page {
  Discovery = 'Discovery',
  DealDetails = 'DealDetails',
  HostDashboard = 'HostDashboard',
}

export interface PriceTier {
  quantity: number;
  price: number;
}

export interface Deal {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  currentPrice: number;
  priceTiers: PriceTier[];
  participants: number;
  targetParticipants: number;
  endTime: Date;
  distanceKm?: number; // Optional for nearby deals
  savingsAmount?: number; // Optional for nearby deals
}

export interface Order {
  id: string;
  dealId: string;
  dealName: string;
  buyerName: string;
  quantity: number;
  totalAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
  orderDate: Date;
}
