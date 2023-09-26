import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order, ProductItemList } from 'src/app/shared/models/Product';
import { AuthService } from 'src/app/@core/authentication/services/auth.service';
import { environment } from 'src/environments/environment';

import { systemUser } from 'src/app/@core/interfaces';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = environment.apiUrl;
  private systemUser: systemUser = { id: '', accessToken: '', role: ''};
  
  constructor(private http: HttpClient, private authService: AuthService) { 
    this.authService.systemUser$.subscribe(systemUser => {
      systemUser = systemUser;
    })
    
  }

  createOrder(data: {client: string, products: ProductItemList[]}): Observable<any> {
    const url = `${this.apiUrl}/products`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.systemUser.accessToken}`
    });

    const body: Order = { 
      ...data,
      userId: Number(this.systemUser.id),
      status: 'pending'
    };

    return this.http.post(url, body, { headers });
  }
}
