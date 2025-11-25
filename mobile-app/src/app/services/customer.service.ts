import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Customer, CustomerProfile, CustomerCreateRequest } from '../shared/models/customer.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private apiService: ApiService) {}

  async getCustomerByQr(qrSecret: string): Promise<CustomerProfile> {
    return firstValueFrom(
      await this.apiService.get<CustomerProfile>(`/public/customer/${qrSecret}`)
    );
  }

  async getCustomerById(customerId: string): Promise<Customer> {
    return firstValueFrom(
      await this.apiService.get<Customer>(`/customer/${customerId}`)
    );
  }

  async getAllCustomers(): Promise<Customer[]> {
    return firstValueFrom(
      await this.apiService.get<Customer[]>('/customer')
    );
  }

  async createCustomer(request: CustomerCreateRequest): Promise<Customer> {
    return firstValueFrom(
      await this.apiService.post<Customer>('/customer', request)
    );
  }

  async getCustomerHistory(customerId: string): Promise<any[]> {
    return firstValueFrom(
      await this.apiService.get<any[]>(`/customer/${customerId}/history`)
    );
  }
}

