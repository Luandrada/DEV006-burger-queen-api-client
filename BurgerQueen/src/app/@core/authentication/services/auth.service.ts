import { Injectable } from '@angular/core';
import { Credentials, LoginResponse } from '../../../shared/interfaces/Login';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  sigIn(credentials: Credentials ):Observable<LoginResponse> {
    return this.http.post('http://localhost:8080/login', credentials).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }
}
