export interface User {
  id: string;
  email: string;
  businessName: string;
  themeJson: string;
  rewardThreshold: number;
  rewardName: string;
  createdAt: string;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface UserLoginResponse {
  token: string;
  user: User;
}

