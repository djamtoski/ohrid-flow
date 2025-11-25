import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { LoyaltyService } from '../../services/loyalty.service';
import { Customer } from '../../shared/models/customer.model';
import { Reward } from '../../shared/models/stamp.model';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.page.html',
  styleUrls: ['./customer-detail.page.scss'],
})
export class CustomerDetailPage implements OnInit {
  customerId: string = '';
  customer: Customer | null = null;
  rewards: Reward[] = [];
  history: any[] = [];
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private loyaltyService: LoyaltyService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  async ngOnInit(): Promise<void> {
    this.customerId = this.route.snapshot.paramMap.get('id') || '';
    if (this.customerId) {
      await this.loadCustomerData();
    }
  }

  async loadCustomerData(): Promise<void> {
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();

    try {
      this.customer = await this.customerService.getCustomerById(this.customerId);
      this.rewards = await this.loyaltyService.getCustomerRewards(this.customerId);
      this.history = await this.customerService.getCustomerHistory(this.customerId);
      await loading.dismiss();
    } catch (error: any) {
      await loading.dismiss();
      await this.showToast(error.message || 'Failed to load customer data', 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  async addStamp(): Promise<void> {
    const loading = await this.loadingController.create({
      message: 'Adding stamp...'
    });
    await loading.present();

    try {
      const result = await this.loyaltyService.addStamp(this.customerId);
      await loading.dismiss();
      
      let message = `Stamp added! Total: ${result.stamps}`;
      if (result.rewardCreated) {
        message += '\nReward created!';
      }
      
      await this.showToast(message, 'success');
      await this.loadCustomerData();
    } catch (error: any) {
      await loading.dismiss();
      await this.showToast(error.message || 'Failed to add stamp', 'danger');
    }
  }

  async redeemReward(reward: Reward): Promise<void> {
    if (reward.status === 'redeemed') {
      await this.showToast('Reward already redeemed', 'warning');
      return;
    }

    const alert = await this.alertController.create({
      header: 'Redeem Reward',
      message: `Redeem ${reward.rewardName}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Redeem',
          handler: async () => {
            const loading = await this.loadingController.create({
              message: 'Redeeming...'
            });
            await loading.present();

            try {
              await this.loyaltyService.redeemReward(reward.id);
              await loading.dismiss();
              await this.showToast('Reward redeemed!', 'success');
              await this.loadCustomerData();
            } catch (error: any) {
              await loading.dismiss();
              await this.showToast(error.message || 'Failed to redeem reward', 'danger');
            }
          }
        }
      ]
    });
    await alert.present();
  }

  private async showToast(message: string, color: string): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color
    });
    await toast.present();
  }
}

