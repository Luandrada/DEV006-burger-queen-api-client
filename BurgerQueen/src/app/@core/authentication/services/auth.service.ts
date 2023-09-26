import { Injectable } from '@angular/core';
import { LoginResponse } from '../../../shared/models/Login';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getToken():string | null {
    return localStorage.getItem("accessToken");
  }

  getRole():string | null {
    const userInfoString = localStorage.getItem("userInfo") ?? '{}'; 
    const info = JSON.parse(userInfoString);
    return info ? info.role : null;
  }

  sigIn(credentials: {email : string, password: string }): Observable<LoginResponse> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }  

}
