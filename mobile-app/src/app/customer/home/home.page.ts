import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../shared/models/customer.model';
import { Preferences } from '@capacitor/preferences';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-customer-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class CustomerHomePage implements OnInit {
  customer: Customer | null = null;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private customerService: CustomerService,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadCustomerData();
  }

  async loadCustomerData(): Promise<void> {
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();

    try {
      // Get customer ID from stored preferences (set after login)
      const customerId = await Preferences.get({ key: 'customer_id' });
      if (customerId.value) {
        this.customer = await this.customerService.getCustomerById(customerId.value);
      }
      await loading.dismiss();
    } catch (error: any) {
      await loading.dismiss();
      console.error('Failed to load customer:', error);
    } finally {
      this.isLoading = false;
    }
  }

  navigateToLoyaltyCard(): void {
    this.router.navigate(['/customer/loyalty-card']);
  }

  navigateToQrDisplay(): void {
    this.router.navigate(['/customer/qr-display']);
  }

  async logout(): Promise<void> {
    await this.authService.logout();
  }
}

