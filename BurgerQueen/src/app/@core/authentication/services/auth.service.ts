import { Injectable } from '@angular/core';
import { Credentials, LoginResponse } from '../../../shared/interfaces/Login';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getToken():string | null {
    return localStorage.getItem("accessToken");
  }

  getRole():string | null {
    return localStorage.getItem("role");
  }

  sigIn(credentials: Credentials): Observable<LoginResponse> {
    return this.http.post('http://localhost:8080/login', credentials).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }  
}
