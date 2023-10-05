import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order, ProductItemList } from 'src/app/shared/models/Product';
import { AuthService } from 'src/app/@core/authentication/services/auth.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})

export class OrdersService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private authService: AuthService) { }

  createOrder(data: {client: string, products: ProductItemList[]}): Observable<any> {
    const url = `${this.apiUrl}/products`;
    const systemUser = this.authService.systemUser$.getValue()
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${systemUser.accessToken}`
    });

    const body: Order = { 
      ...data,
      userId: Number(systemUser.id),
      status: 'pending'
    };

    return this.http.post(url, body, { headers });
  }
}
