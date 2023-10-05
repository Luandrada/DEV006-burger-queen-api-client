import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/shared/models/Product';
import { AuthService } from '../authentication/services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private apiUrl = environment.apiUrl;
  private allProducts: Product[] = [];

  constructor(private http: HttpClient, private authService : AuthService) {}

  getAllProducts():Observable<Product[]> {
    if (this.allProducts.length !== 0 ) {
      return of(this.allProducts) ;
    }
    
    const token = this.authService.systemUser$.getValue().accessToken;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get( `${this.apiUrl}/products`, { headers }).pipe(
      map((resp) => {
        return this.allProducts = resp as Product[];
      }));
  }
  
  getProductByCategory(types: Array<string>):Observable<Product[]> { // se filtra por arreglo que es más flexible
    return this.getAllProducts().pipe(
      map((resp) => {
        return resp.filter(item => types.includes(item.type))
      })
    )
  }
}
