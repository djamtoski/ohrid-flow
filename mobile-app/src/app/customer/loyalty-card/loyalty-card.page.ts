import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { LoyaltyService } from '../../services/loyalty.service';
import { Customer } from '../../shared/models/customer.model';
import { Reward } from '../../shared/models/stamp.model';
import { ThemeService } from '../../services/theme.service';
import { Preferences } from '@capacitor/preferences';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-loyalty-card',
  templateUrl: './loyalty-card.page.html',
  styleUrls: ['./loyalty-card.page.scss'],
})
export class LoyaltyCardPage implements OnInit {
  customer: Customer | null = null;
  rewards: Reward[] = [];
  threshold = 10;
  isLoading = false;

  constructor(
    private customerService: CustomerService,
    private loyaltyService: LoyaltyService,
    private themeService: ThemeService,
    private loadingController: LoadingController
  ) {}

  async ngOnInit(): Promise<void> {
    this.threshold = this.themeService.getRewardThreshold();
    await this.loadCustomerData();
  }

  async loadCustomerData(): Promise<void> {
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();

    try {
      const customerId = await Preferences.get({ key: 'customer_id' });
      if (customerId.value) {
        this.customer = await this.customerService.getCustomerById(customerId.value);
        this.rewards = await this.loyaltyService.getCustomerRewards(customerId.value);
      }
      await loading.dismiss();
    } catch (error: any) {
      await loading.dismiss();
      console.error('Failed to load customer:', error);
    } finally {
      this.isLoading = false;
    }
  }

  getProgressPercentage(): number {
    if (!this.customer) return 0;
    return Math.min((this.customer.stamps / this.threshold) * 100, 100);
  }

  getStampsArray(): boolean[] {
    const stamps = this.customer?.stamps || 0;
    const array: boolean[] = [];
    for (let i = 0; i < this.threshold; i++) {
      array.push(i < stamps);
    }
    return array;
  }
}

