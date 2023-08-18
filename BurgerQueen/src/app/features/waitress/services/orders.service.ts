import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Order } from 'src/app/shared/interfaces/Product';
import { AuthService } from 'src/app/@core/authentication/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  createOrder(data: Order): Observable<any> {
    const url = 'http://localhost:8080/products';
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.post(url, data, { headers });
  }
}
