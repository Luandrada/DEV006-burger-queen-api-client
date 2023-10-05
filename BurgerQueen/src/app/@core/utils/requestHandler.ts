import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import  { requestResponse, HttpMethods, HttpRequestOptions } from '../interfaces'

@Injectable({
  providedIn: 'root'
})

export class requestHandler <ResultType,BodyType> {

  constructor(private httpClient: HttpClient) {}

 response$ = new Subject<requestResponse<ResultType>>()

 makeCall(method: HttpMethods, url:string, body:BodyType | null = null, requestOptions: HttpRequestOptions | null = null ): void {
   this.response$.next({ isLoading: true, error: null, data: null });

   this.httpClient.request(method, url, {...requestOptions, body}).subscribe(
    (data)=> {
      this.response$.next({  isLoading: false, error: null, data: data as ResultType})
    },
    (error) => this.response$.next({ isLoading: false, error: error, data: null})
    )
  }
}
