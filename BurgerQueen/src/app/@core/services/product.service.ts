import { Injectable } from '@angular/core';
import { Observable, Subscriber, Subscription, } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/shared/models/Product';
import { AuthService } from '../authentication/services/auth.service';
import { environment } from 'src/environments/environment';
import { requestResponse } from '../../shared/interfaces';
import { requestHandler } from '../../shared/utils/requestHandler.service';
import { filtersForProducts } from '../../shared/interfaces';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private apiUrl = environment.apiUrl;
  private _products: Product[] = [];

  constructor(private authService : AuthService, private requestHandler: requestHandler ) {
  }

  private _getProducts() {
    return new Observable((subscriber: Subscriber<requestResponse<Product[]>>) => {
      let subscriptionRequest: Subscription;
      if (this._products.length !== 0 ) {
        subscriber.next({ isLoading: false, error: null, data: this._products })
        subscriber.complete();
      }
      else {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.authService.getSystemUser().accessToken}`
        });
        subscriptionRequest =  this.requestHandler.makeCall<Product[]|null,null>('GET', `${this.apiUrl}/products`,null,{headers})
        .subscribe({
          next: (state) => {
            if(Array.isArray(state.data)){
              this._products = state.data;
            }
            subscriber.next({
              isLoading: state.isLoading,
              data: this._products,
              error: state.error
            });
          },
          complete: () => {
            subscriber.complete(); 
          }
        });
      }

      return {
          unsubscribe(){
            if(subscriptionRequest){
              subscriptionRequest.unsubscribe();
            }
             
          }
      }
    });
  }
  private _filterProducts(filters:filtersForProducts = {types:[]}, products: Product[]){
    if(Array.isArray(filters.types) && filters.types.length){
      const types = filters.types || []
      return products.filter(p => types.includes(p.type))
    }
    return products;
  }

  getProducts(filters?:filtersForProducts) {
    return new Observable((subscriber: Subscriber<requestResponse<Product[]>>) => {
      const subscriptionToProdcuts = this._getProducts()
      .pipe(map((state) => {
        return {
          isLoading: state.isLoading, 
          error: state.error,
          data: this._filterProducts(filters, state.data as Product[])
        }
      }))
      .subscribe({
        next (state) {
          subscriber.next(state);
        },
        complete() {
          subscriber.complete();
        },
      })

      return {
        unsubscribe() {
          subscriptionToProdcuts.unsubscribe();
        },
      }
    })
  }
}
