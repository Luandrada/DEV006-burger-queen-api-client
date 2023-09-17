import { Injectable } from '@angular/core';
import { LoginResponse } from '../../../shared/models/Login';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
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
    return localStorage.getItem("role");
  }

  sigIn(credentials: {email : string, password: string }): Observable<LoginResponse> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }  

  // sigIn(credentials: Credentials): Observable<LoginResponse> {
  //   return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials);
  // }
}
