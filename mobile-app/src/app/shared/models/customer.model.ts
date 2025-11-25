export interface Customer {
  id: string;
  userId: string;
  name: string;
  phone: string;
  stamps: number;
  totalRewards: number;
  qrSecret: string;
  createdAt: string;
}

export interface CustomerProfile {
  name: string;
  stamps: number;
  totalRewards: number;
}

export interface CustomerCreateRequest {
  name: string;
  phone: string;
}

