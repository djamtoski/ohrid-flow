import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../shared/models/customer.model';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {
  customers: Customer[] = [];
  isLoading = false;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadCustomers();
  }

  async loadCustomers(): Promise<void> {
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Loading customers...'
    });
    await loading.present();

    try {
      this.customers = await this.customerService.getAllCustomers();
      await loading.dismiss();
    } catch (error: any) {
      await loading.dismiss();
      await this.showToast(error.message || 'Failed to load customers', 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  viewCustomer(customer: Customer): void {
    this.router.navigate(['/owner/customer-detail', customer.id]);
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

