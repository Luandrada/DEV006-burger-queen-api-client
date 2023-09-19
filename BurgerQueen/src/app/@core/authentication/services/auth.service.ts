import { Injectable } from '@angular/core';
import { Credentials, LoginResponse } from '../../../shared/interfaces/Login';
import { Observable, BehaviorSubject, Subject, Subscription } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  public isSiginLoading!: Boolean;
  public userInfo = new BehaviorSubject<{id:string, accessToken:string, role:string}>({
    id:'',
    accessToken:'',
    role:''
  })

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { 
    const id = localStorageService.getStorage('idUser');
    if(id){
      this.userInfo.next({
        id,
        accessToken: localStorageService.getStorage('accessToken'),
        role: localStorageService.getStorage('role')
      })
    }
  }

  sigIn(credentials: Credentials) {
    const apiService = new ApiService<LoginResponse>();
    apiService.makeCall(this.http.post(`${this.apiUrl}/login`, credentials) as Observable<LoginResponse>)
    apiService.data.subscribe(resp => {

      if(!resp){
        return
      }
      this.localStorageService.setStorage("accessToken", resp.accessToken);
      this.localStorageService.setStorage("role", resp.user.role);
      this.localStorageService.setStorage("idUser", resp.user.id.toString());
      this.userInfo.next({
        id: resp.user.id.toString(),
        accessToken: resp.accessToken,
        role: resp.user.role
      })
        
    })
    apiService.loading.subscribe(loading => this.isSiginLoading = loading)
    return apiService
  }  
}
