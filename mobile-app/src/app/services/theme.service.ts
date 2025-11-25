import { Injectable } from '@angular/core';
import { Theme } from '../shared/models/theme.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme: Theme | null = null;

  constructor() {}

  applyTheme(themeJson: string): void {
    try {
      const theme: Theme = JSON.parse(themeJson);
      this.currentTheme = theme;

      // Apply CSS variables
      document.documentElement.style.setProperty('--primary', theme.primaryColor);
      document.documentElement.style.setProperty('--bg', theme.backgroundColor);
      
      if (theme.logoUrl) {
        document.documentElement.style.setProperty('--logo-url', `url(${theme.logoUrl})`);
      }
    } catch (error) {
      console.error('Failed to parse theme JSON:', error);
      this.applyDefaultTheme();
    }
  }

  applyDefaultTheme(): void {
    document.documentElement.style.setProperty('--primary', '#2e2e2e');
    document.documentElement.style.setProperty('--bg', '#ffffff');
  }

  getCurrentTheme(): Theme | null {
    return this.currentTheme;
  }

  getPrimaryColor(): string {
    return this.currentTheme?.primaryColor || '#2e2e2e';
  }

  getBackgroundColor(): string {
    return this.currentTheme?.backgroundColor || '#ffffff';
  }

  getRewardThreshold(): number {
    return this.currentTheme?.rewardThreshold || 10;
  }

  getRewardName(): string {
    return this.currentTheme?.rewardName || 'Reward';
  }
}

