import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../../services/local-storage.service';
import { requestHandler } from '../../utils/requestHandler';
import { LoginResponse, requestResponse, systemUser } from '../../interfaces';

export interface Credentials  {
  email: string,
  password: string,
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = environment.apiUrl;

  private loginHandler!:requestHandler <LoginResponse, Credentials>
  loginResponse$!: Subject<requestResponse<LoginResponse>>;
  systemUser$ = new BehaviorSubject<systemUser>({ id: '', accessToken: '', role: ''});
  
  constructor(private http: HttpClient, private localStorageService: LocalStorageService, private router: Router, ) {
    this.loginHandler = new requestHandler<LoginResponse, Credentials>(http)
    this.loginResponse$ = this.loginHandler.response$;

    this.loginResponse$.subscribe((state)=> {
      if(state.data){
        const newUser = {
          id: state.data.user.id.toString(), 
          accessToken: state.data.accessToken, 
          role: state.data.user.role
        }
        this.systemUser$.next(newUser);
      }
    });

    this.systemUser$.subscribe((user)=>{
      this.localStorageService.setStorage("accessToken", user.accessToken);
      this.localStorageService.setStorage("role", user.role);
      this.localStorageService.setStorage("idUser", user.id);
      // if(!user.accessToken) { 
      //   this.router.navigate(['/sign-in']);
      // } 
      // else {  
      //   this.router.navigate([`orders/${user.role}`])
      // }
    })
  }

  login(credentials: Credentials) {
    const url = `${this.apiUrl}/login`;
    const body = credentials;
    this.loginHandler.makeCall('POST', url, body)
  
  }

  logout () {
    this.systemUser$.next({ id: '', accessToken: '', role: ''})
  }
}
