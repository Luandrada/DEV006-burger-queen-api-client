import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getStorage(key: string): string {
    return localStorage.getItem(key) || '';
  }

  clearStorage() {
    localStorage.clear();
  }
}
