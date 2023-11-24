import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { requestResponse, HttpMethods, HttpRequestOptions } from '../../shared/interfaces'

@Injectable({
    providedIn: 'root'
})

export class requestHandler {

    constructor(private httpClient: HttpClient) { }

    makeCall<ResultType, BodyType>(method: HttpMethods, url: string, body: BodyType | null = null, requestOptions: HttpRequestOptions | null = null) {
        const observer:Observable<requestResponse<ResultType>> = new Observable((subscriber: Subscriber<requestResponse<ResultType>>) => {
            
            subscriber.next({ isLoading: true, error: null, data: null });
            const httpSubcription = this.httpClient.request(method, url, { ...requestOptions, body })
            .subscribe(
                (data) => {
                  subscriber.next({ isLoading: false, error: null, data: data as ResultType });
                  subscriber.complete()
                },
                (error) => {
                  subscriber.next({ isLoading: false, error: error, data: null });
                  subscriber.complete()
                },
            )

            return {
                unsubscribe(){
                   httpSubcription.unsubscribe();
                }
            }
        });

        return observer
    }
}
