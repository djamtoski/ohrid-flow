import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../shared/models/customer.model';
import { Preferences } from '@capacitor/preferences';
import { LoadingController } from '@ionic/angular';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-qr-display',
  templateUrl: './qr-display.page.html',
  styleUrls: ['./qr-display.page.scss'],
})
export class QrDisplayPage implements OnInit {
  qrDataUrl: string = '';
  customer: Customer | null = null;
  isLoading = false;

  constructor(
    private customerService: CustomerService,
    private loadingController: LoadingController
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadCustomerAndGenerateQr();
  }

  async loadCustomerAndGenerateQr(): Promise<void> {
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Generating QR code...'
    });
    await loading.present();

    try {
      const customerId = await Preferences.get({ key: 'customer_id' });
      if (customerId.value) {
        this.customer = await this.customerService.getCustomerById(customerId.value);
        
        if (this.customer?.qrSecret) {
          const qrUrl = `ohridloyalty://card/${this.customer.qrSecret}`;
          this.qrDataUrl = await QRCode.toDataURL(qrUrl, {
            width: 300,
            margin: 2,
            color: {
              dark: '#000000',
              light: '#FFFFFF'
            }
          });
        }
      }
      await loading.dismiss();
    } catch (error: any) {
      await loading.dismiss();
      console.error('Failed to generate QR code:', error);
    } finally {
      this.isLoading = false;
    }
  }
}

