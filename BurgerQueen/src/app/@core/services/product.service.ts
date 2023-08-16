import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/shared/interfaces/Product';
import { AuthService } from '../authentication/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private authService : AuthService) { }

  getAllProducts():Observable<Product[]> {
    const token = this.authService.getToken(); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get('http://localhost:8080/products', { headers }).pipe(
      map((resp: any) => {
        return resp as Product[];
      })
    );
  }

  getBreakfastProducts(): Observable<Product[]> {
    return this.getAllProducts().pipe(
      map(products => products.filter(item => item.type === "Desayuno"))
    );
  }
  
  getLunchProducts(): Observable<Product[]> {
    return this.getAllProducts().pipe(
      map(products => products.filter(item => item.type === "Almuerzo"))
    );
  }
}
