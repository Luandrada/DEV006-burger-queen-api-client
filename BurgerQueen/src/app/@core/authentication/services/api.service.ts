import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map, tap, catchError, finalize } from 'rxjs/operators';
import { Product } from 'src/app/shared/interfaces/Product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiService {


 loading = new BehaviorSubject<boolean>(false);
 error = new BehaviorSubject<HttpErrorResponse|null>(null);
 data = new BehaviorSubject<any>(null);

 constructor() { }

//  call<resultType>(observable:Observable<resultType>, isLoading:boolean, error:Error|null):void{
//     this.loading.next(true);
//     this.error.next(null);

//     //this.http.request(method,url,{body})
//     observable.pipe(
//         catchError((error) => {
//             this.error.next(error);
//             return throwError(error)
//         }),
//         finalize(() => {
//             this.loading.next(false);
//         }),
//     ).subscribe(data => {
//         this.data.next(data as resultType)
//     })  
//  }

 makeCall<responseData>(observable: Observable<responseData>): void {
    this.loading.next(true);
    this.error.next(null);

    observable
      .pipe(
        catchError((error) => {
          this.error.next(error);
          return of([]);
        }),
        finalize(() => this.loading.next(false))
      )
      .subscribe((data) => {
        this.data.next(data as responseData);
      });
  }

}
