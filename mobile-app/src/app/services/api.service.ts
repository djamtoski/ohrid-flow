import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private async getHeaders(): Promise<HttpHeaders> {
    const token = await Preferences.get({ key: 'auth_token' });
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (token.value) {
      headers = headers.set('Authorization', `Bearer ${token.value}`);
    }

    return headers;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }

  async get<T>(endpoint: string): Promise<Observable<T>> {
    const headers = await this.getHeaders();
    return this.http.get<T>(`${this.apiUrl}${endpoint}`, { headers })
      .pipe(catchError(this.handleError));
  }

  async post<T>(endpoint: string, data: any): Promise<Observable<T>> {
    const headers = await this.getHeaders();
    return this.http.post<T>(`${this.apiUrl}${endpoint}`, data, { headers })
      .pipe(catchError(this.handleError));
  }

  async put<T>(endpoint: string, data: any): Promise<Observable<T>> {
    const headers = await this.getHeaders();
    return this.http.put<T>(`${this.apiUrl}${endpoint}`, data, { headers })
      .pipe(catchError(this.handleError));
  }

  async delete<T>(endpoint: string): Promise<Observable<T>> {
    const headers = await this.getHeaders();
    return this.http.delete<T>(`${this.apiUrl}${endpoint}`, { headers })
      .pipe(catchError(this.handleError));
  }
}

