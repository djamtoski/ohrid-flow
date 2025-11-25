import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Reward } from '../shared/models/stamp.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyService {
  constructor(private apiService: ApiService) {}

  async addStamp(customerId: string): Promise<{ stamps: number; rewardCreated?: Reward }> {
    return firstValueFrom(
      await this.apiService.post<{ stamps: number; rewardCreated?: Reward }>(
        `/loyalty/customer/${customerId}/stamp`,
        {}
      )
    );
  }

  async addStampByQr(qrSecret: string): Promise<{ stamps: number; rewardCreated?: Reward }> {
    return firstValueFrom(
      await this.apiService.post<{ stamps: number; rewardCreated?: Reward }>(
        `/loyalty/qr/${qrSecret}/stamp`,
        {}
      )
    );
  }

  async redeemReward(rewardId: string): Promise<Reward> {
    return firstValueFrom(
      await this.apiService.post<Reward>(`/loyalty/reward/${rewardId}/redeem`, {})
    );
  }

  async getCustomerRewards(customerId: string): Promise<Reward[]> {
    return firstValueFrom(
      await this.apiService.get<Reward[]>(`/loyalty/customer/${customerId}/rewards`)
    );
  }
}

