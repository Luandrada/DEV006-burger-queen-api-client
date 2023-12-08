import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Order, newOrder} from '../../../shared/models/Product';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { environment } from '../../../../environments/environment';
import { requestResponse } from '../../../shared/interfaces';
import { requestHandler } from '../../../shared/utils/requestHandler.service';

@Injectable({
  providedIn: 'root'
})

export class OrdersService {
  private apiUrl = environment.apiUrl;
  
  constructor(private authService: AuthService, private requestHandler: requestHandler) { }

  createOrder(newOrder: newOrder): Observable<requestResponse<Order>> {
    const url = `${this.apiUrl}/orders`;
    const systemUser = this.authService.getSystemUser()
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${systemUser.accessToken}`
    });
    const body: Order = { 
      ...newOrder,
      userId: Number(systemUser.id),
      status: 'pending'
    };
    return this.requestHandler.makeCall<Order,Order>('POST', url, body, { headers })
  }
}
