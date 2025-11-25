import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login-owner',
  templateUrl: './login-owner.page.html',
  styleUrls: ['./login-owner.page.scss'],
})
export class LoginOwnerPage {
  email = '';
  password = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  async login(): Promise<void> {
    if (!this.email || !this.password) {
      await this.showToast('Please enter email and password', 'danger');
      return;
    }

    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Logging in...'
    });
    await loading.present();

    try {
      const response = await this.authService.loginOwner(this.email, this.password);
      
      // Apply theme
      if (response.user.themeJson) {
        this.themeService.applyTheme(response.user.themeJson);
      }

      await loading.dismiss();
      this.router.navigate(['/owner/home']);
    } catch (error: any) {
      await loading.dismiss();
      await this.showToast(error.message || 'Login failed', 'danger');
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

