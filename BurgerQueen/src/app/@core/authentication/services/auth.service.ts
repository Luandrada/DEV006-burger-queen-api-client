import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { environment } from 'src/environments/environment';
import { requestHandler } from '../../../shared/utils/requestHandler.service';
import { LoginResponse, requestResponse, systemUser } from '../../../shared/interfaces';

export interface Credentials  {
  email: string,
  password: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private _systemUser$ = new BehaviorSubject<systemUser>({ id: '', accessToken: '', role: '', email: ''});
  public systemUser$: Observable<systemUser> = this._systemUser$;


  constructor(private requestHandler: requestHandler) {
  }

  getSystemUser = () => this._systemUser$.getValue() 

  login(credentials: Credentials) {
    return new Observable((subscriber: Subscriber<requestResponse<LoginResponse>>) => {   
      const url = `${this.apiUrl}/login`;
      const body = credentials;

      const subscriptionRequest = this.requestHandler.makeCall<LoginResponse, Credentials>('POST', url, body)
      .subscribe({
        next: (state) => {
          if (state.data) {
            const newUser = {
              id: state.data.user.id.toString(), 
              accessToken: state.data.accessToken, 
              role: state.data.user.role, 
              email: state.data.user.email
            }
            this._systemUser$.next(newUser);
          }
          subscriber.next(state);
          
        },
        complete () {
          subscriber.complete(); 
        }
      });

      return {
        unsubscribe() {
          subscriptionRequest.unsubscribe();
        }
      }
    });
  }

  logout () {
    this._systemUser$.next({ id: '', accessToken: '', role: '', email: ""});
  }

}
