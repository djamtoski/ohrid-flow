import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { ApiService } from './api.service';
import { UserLoginRequest, UserLoginResponse, User } from '../shared/models/user.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null;
  private userRole: 'owner' | 'customer' | null = null;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  async loginOwner(email: string, password: string): Promise<UserLoginResponse> {
    const request: UserLoginRequest = { email, password };
    const response = await firstValueFrom(
      await this.apiService.post<UserLoginResponse>('/auth/owner/login', request)
    );
    
    await Preferences.set({ key: 'auth_token', value: response.token });
    await Preferences.set({ key: 'user_role', value: 'owner' });
    await Preferences.set({ key: 'user_id', value: response.user.id });
    
    this.currentUser = response.user;
    this.userRole = 'owner';
    
    return response;
  }

  async loginCustomer(phone: string, otp: string): Promise<void> {
    // This will use Firebase Auth for OTP verification
    // For now, placeholder implementation
    await Preferences.set({ key: 'user_role', value: 'customer' });
    this.userRole = 'customer';
  }

  async logout(): Promise<void> {
    await Preferences.remove({ key: 'auth_token' });
    await Preferences.remove({ key: 'user_role' });
    await Preferences.remove({ key: 'user_id' });
    this.currentUser = null;
    this.userRole = null;
    this.router.navigate(['/auth/role-select']);
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await Preferences.get({ key: 'auth_token' });
    return !!token.value;
  }

  async getUserRole(): Promise<'owner' | 'customer' | null> {
    if (this.userRole) {
      return this.userRole;
    }
    const role = await Preferences.get({ key: 'user_role' });
    return role.value as 'owner' | 'customer' | null;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  async loadStoredUser(): Promise<void> {
    const userId = await Preferences.get({ key: 'user_id' });
    if (userId.value) {
      try {
        const user = await firstValueFrom(
          await this.apiService.get<User>(`/auth/user/${userId.value}`)
        );
        this.currentUser = user;
      } catch (error) {
        console.error('Failed to load user:', error);
      }
    }
  }
}

