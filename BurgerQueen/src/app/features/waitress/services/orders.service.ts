import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Order, item} from 'src/app/shared/models/Product';
import { AuthService } from 'src/app/@core/authentication/services/auth.service';
import { environment } from 'src/environments/environment';
import { requestResponse } from 'src/app/shared/interfaces';
import { requestHandler } from 'src/app/@core/utils/requestHandler.service';
@Injectable({
  providedIn: 'root'
})

export class OrdersService {
  private apiUrl = environment.apiUrl;
  
  constructor(private authService: AuthService, private requestHandler: requestHandler) { }

  createOrder(newOrder: {client: string, items: Map<string, item>}): Observable<requestResponse<Order>> {
    return new Observable((subscriber: Subscriber<requestResponse<Order>>) => {
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

      const subscriptionRequest = this.requestHandler.makeCall<Order,Order>('POST', url, body, { headers })
      .subscribe({
        next: (requestResponse) => {
          subscriber.next(requestResponse)
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
}
