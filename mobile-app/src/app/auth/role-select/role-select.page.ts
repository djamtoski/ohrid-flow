import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-select',
  templateUrl: './role-select.page.html',
  styleUrls: ['./role-select.page.scss'],
})
export class RoleSelectPage {
  constructor(private router: Router) {}

  selectOwner(): void {
    this.router.navigate(['/auth/login-owner']);
  }

  selectCustomer(): void {
    this.router.navigate(['/auth/login-customer']);
  }
}

