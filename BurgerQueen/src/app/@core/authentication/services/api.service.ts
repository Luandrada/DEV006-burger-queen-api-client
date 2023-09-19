import { Injectable } from '@angular/core';
import { Observable, Subject, throwError, of } from 'rxjs';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map, tap, catchError, finalize } from 'rxjs/operators';
import { Product } from 'src/app/shared/interfaces/Product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiService<DataType> {


 loading = new Subject<boolean>();
 error = new Subject<HttpErrorResponse|null>();
 data = new Subject< DataType | null>();

 constructor() { }

 makeCall(observable: Observable<DataType>): void {
    this.loading.next(true);
    this.error.next(null);

    observable
      .pipe(
        catchError((error) => {
          this.error.next(error);
          return of([]);
        }),
        finalize(() => {
          this.loading.next(false)
        }
        )
      )
      .subscribe((data) => {
        this.data.next(data as DataType);
      });
  }

}
