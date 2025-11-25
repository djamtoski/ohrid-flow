import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-owner-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class OwnerHomePage implements OnInit {
  user: User | null = null;

  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.user = this.authService.getCurrentUser();
    if (!this.user) {
      await this.authService.loadStoredUser();
      this.user = this.authService.getCurrentUser();
    }

    if (this.user?.themeJson) {
      this.themeService.applyTheme(this.user.themeJson);
    }
  }

  navigateToScanner(): void {
    this.router.navigate(['/owner/qr-scanner']);
  }

  navigateToCustomers(): void {
    this.router.navigate(['/owner/customers']);
  }

  navigateToSettings(): void {
    this.router.navigate(['/owner/settings']);
  }

  async logout(): Promise<void> {
    await this.authService.logout();
  }

  getCurrentTheme() {
    return this.themeService.getCurrentTheme();
  }
}

