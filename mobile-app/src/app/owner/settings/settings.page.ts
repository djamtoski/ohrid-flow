import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { ApiService } from '../../services/api.service';
import { User } from '../../shared/models/user.model';
import { Theme } from '../../shared/models/theme.model';
import { ToastController, LoadingController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  user: User | null = null;
  theme: Theme = {
    primaryColor: '#2e2e2e',
    backgroundColor: '#ffffff',
    rewardThreshold: 10,
    rewardName: 'Reward'
  };
  businessName = '';

  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private apiService: ApiService,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  async ngOnInit(): Promise<void> {
    this.user = this.authService.getCurrentUser();
    if (this.user) {
      this.businessName = this.user.businessName;
      if (this.user.themeJson) {
        try {
          this.theme = JSON.parse(this.user.themeJson);
        } catch (error) {
          console.error('Failed to parse theme:', error);
        }
      }
    }
  }

  async saveSettings(): Promise<void> {
    if (!this.user) return;

    const loading = await this.loadingController.create({
      message: 'Saving...'
    });
    await loading.present();

    try {
      const themeJson = JSON.stringify(this.theme);
      const updateData = {
        businessName: this.businessName,
        themeJson,
        rewardThreshold: this.theme.rewardThreshold,
        rewardName: this.theme.rewardName
      };

      await firstValueFrom(
        await this.apiService.put(`/auth/user/${this.user.id}`, updateData)
      );

      this.themeService.applyTheme(themeJson);
      await loading.dismiss();
      await this.showToast('Settings saved!', 'success');
    } catch (error: any) {
      await loading.dismiss();
      await this.showToast(error.message || 'Failed to save settings', 'danger');
    }
  }

  previewTheme(): void {
    this.themeService.applyTheme(JSON.stringify(this.theme));
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

