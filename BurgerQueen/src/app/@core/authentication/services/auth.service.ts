import { Injectable } from '@angular/core';
import { Credentials, LoginResponse } from '../../../shared/interfaces/Login';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  public isSiginLoading!: Boolean;

  constructor(private http: HttpClient) { }

  getToken():string | null {
    return localStorage.getItem("accessToken");
  }

  getRole():string | null {
    return localStorage.getItem("role");
  }

  sigIn(credentials: Credentials):ApiService {
    const apiService = new ApiService();
    apiService.makeCall(this.http.post(`${this.apiUrl}/login`, credentials))
    apiService.data.subscribe(d => console.log(d))
    apiService.loading.subscribe(loading => this.isSiginLoading = loading)
    return apiService
  }  
}
