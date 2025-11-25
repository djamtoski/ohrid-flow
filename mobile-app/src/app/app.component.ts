import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private router: Router,
    private authService: AuthService,
    private themeService: ThemeService
  ) {
    this.initializeApp();
  }

  async ngOnInit(): Promise<void> {
    await this.checkAuthAndRoute();
  }

  async initializeApp(): Promise<void> {
    await this.platform.ready();
  }

  async checkAuthAndRoute(): Promise<void> {
    const isAuthenticated = await this.authService.isAuthenticated();
    const role = await this.authService.getUserRole();

    if (isAuthenticated && role) {
      if (role === 'owner') {
        await this.authService.loadStoredUser();
        this.router.navigate(['/owner/home']);
      } else if (role === 'customer') {
        this.router.navigate(['/customer/home']);
      }
    } else {
      this.router.navigate(['/auth/role-select']);
    }
  }
}
