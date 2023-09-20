import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, throwError, of } from 'rxjs';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { map, tap, catchError, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class stateService<DataType> {

 state$ = new Subject<{
    isLoading: Boolean,
    error: HttpErrorResponse|null,
    data: DataType | null
 }>()

 observable!: Observable<DataType>

 constructor(observable: Observable<DataType>) {
    this.observable = observable;
  }

 makeCall(): void {
    // this.state.next({
    //     isLoading: true,
    //     error: null,
    //     data: null,
    //   })

    this.observable
      .pipe(
        tap(()=> {
            console.log("hola")
            this.state$.next({
              isLoading: true,
              error: null,
              data: null,
            })
          }),
        catchError((error) => {
            this.state$.next({
                isLoading: false,
                error: error,
                data: null,
            })
            return of(undefined)
        })
        ).subscribe((data) => {  
            this.state$.next({
                isLoading: false,
                error: null,
                data: data as DataType,
            })
        });
  }

}
