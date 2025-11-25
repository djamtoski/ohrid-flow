import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import { CustomerService } from '../../services/customer.service';
import { LoyaltyService } from '../../services/loyalty.service';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
})
export class QrScannerPage {
  @ViewChild('scanner', { static: false }) scanner!: ZXingScannerComponent;
  
  allowedFormats = [BarcodeFormat.QR_CODE];
  hasPermission = false;
  scannerEnabled = false;
  currentCustomer: any = null;

  constructor(
    private customerService: CustomerService,
    private loyaltyService: LoyaltyService,
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  ionViewWillEnter(): void {
    this.scannerEnabled = true;
  }

  ionViewWillLeave(): void {
    this.scannerEnabled = false;
  }

  onScanSuccess(result: string): void {
    this.scannerEnabled = false;
    this.processQrCode(result);
  }

  async processQrCode(qrData: string): Promise<void> {
    // Extract qrSecret from ohridloyalty://card/{qrSecret}
    const match = qrData.match(/ohridloyalty:\/\/card\/(.+)/);
    if (!match) {
      this.showToast('Invalid QR code format', 'danger');
      this.scannerEnabled = true;
      return;
    }

    const qrSecret = match[1];
    const loading = await this.loadingController.create({
      message: 'Loading customer...'
    });
    await loading.present();

    try {
      const customer = await this.customerService.getCustomerByQr(qrSecret);
      await loading.dismiss();
      this.currentCustomer = customer;
      await this.showCustomerOptions(customer, qrSecret);
    } catch (error: any) {
      await loading.dismiss();
      await this.showToast('Customer not found', 'danger');
      this.scannerEnabled = true;
    }
  }

  async showCustomerOptions(customer: any, qrSecret: string): Promise<void> {
    const alert = await this.alertController.create({
      header: customer.name,
      message: `Stamps: ${customer.stamps}\nTotal Rewards: ${customer.totalRewards}`,
      buttons: [
        {
          text: 'Add Stamp',
          handler: () => {
            this.addStamp(qrSecret);
          }
        },
        {
          text: 'View History',
          handler: () => {
            this.viewHistory(qrSecret);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.scannerEnabled = true;
          }
        }
      ]
    });
    await alert.present();
  }

  async addStamp(qrSecret: string): Promise<void> {
    const loading = await this.loadingController.create({
      message: 'Adding stamp...'
    });
    await loading.present();

    try {
      const result = await this.loyaltyService.addStampByQr(qrSecret);
      
      await loading.dismiss();
      
      let message = `Stamp added! Total: ${result.stamps}`;
      if (result.rewardCreated) {
        message += '\nReward created!';
      }
      
      await this.showToast(message, 'success');
      this.scannerEnabled = true;
    } catch (error: any) {
      await loading.dismiss();
      await this.showToast(error.message || 'Failed to add stamp', 'danger');
      this.scannerEnabled = true;
    }
  }

  async viewHistory(qrSecret: string): Promise<void> {
    // Navigate to customer detail page
    this.router.navigate(['/owner/customer-detail', qrSecret]);
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

