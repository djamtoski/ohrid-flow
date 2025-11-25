import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login-customer',
  templateUrl: './login-customer.page.html',
  styleUrls: ['./login-customer.page.scss'],
})
export class LoginCustomerPage {
  phone = '';
  otp = '';
  otpSent = false;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  async sendOtp(): Promise<void> {
    if (!this.phone) {
      await this.showToast('Please enter your phone number', 'danger');
      return;
    }

    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Sending OTP...'
    });
    await loading.present();

    try {
      // TODO: Implement Firebase Auth OTP sending
      // For now, simulate OTP sent
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.otpSent = true;
      await loading.dismiss();
      await this.showToast('OTP sent to your phone', 'success');
    } catch (error: any) {
      await loading.dismiss();
      await this.showToast(error.message || 'Failed to send OTP', 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  async verifyOtp(): Promise<void> {
    if (!this.otp) {
      await this.showToast('Please enter the OTP', 'danger');
      return;
    }

    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Verifying...'
    });
    await loading.present();

    try {
      await this.authService.loginCustomer(this.phone, this.otp);
      await loading.dismiss();
      this.router.navigate(['/customer/home']);
    } catch (error: any) {
      await loading.dismiss();
      await this.showToast(error.message || 'Invalid OTP', 'danger');
    } finally {
      this.isLoading = false;
    }
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

