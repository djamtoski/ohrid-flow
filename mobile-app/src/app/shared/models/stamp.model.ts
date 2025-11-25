export interface StampEvent {
  id: string;
  customerId: string;
  userId: string;
  type: 'stamp' | 'reward_redeemed';
  timestamp: string;
}

export interface Reward {
  id: string;
  customerId: string;
  userId: string;
  rewardName: string;
  status: 'pending' | 'redeemed';
  createdAt: string;
  redeemedAt?: string;
}

