import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
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
  public loginResponse$!: Subject<requestResponse<LoginResponse>>;
  public systemUser$ = new BehaviorSubject<systemUser>({ id: '', accessToken: '', role: '', email: ''});

  constructor(private http: HttpClient, private localStorageService: LocalStorageService ) {
    this.loginHandler = new requestHandler<LoginResponse, Credentials>(this.http)
    this.loginResponse$ = this.loginHandler.response$;

    this.loginResponse$.subscribe((state)=> {
      if(state.data){
        const newUser = {
          id: state.data.user.id.toString(), 
          accessToken: state.data.accessToken, 
          role: state.data.user.role, 
          email: state.data.user.email
        }
        this.systemUser$.next(newUser);
      }
    });
    this.systemUser$.subscribe((user)=>{
      this.localStorageService.setStorage("accessToken", user.accessToken);
      this.localStorageService.setStorage("role", user.role);
      this.localStorageService.setStorage("idUser", user.id);
    })
  }

  login(credentials: Credentials) {
    const url = `${this.apiUrl}/login`;
    const body = credentials;
    this.loginHandler.makeCall('POST', url, body);
  }

  logout () {
    this.systemUser$.next({ id: '', accessToken: '', role: '', email: ""});
  }
}
