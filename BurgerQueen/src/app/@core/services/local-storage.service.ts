import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  clearStorage() {
    localStorage.clear();
  }

  getUserInfo() {
    const userInfoString = localStorage.getItem("userInfo") ?? '{}'; 
    const userInfoObject = JSON.parse(userInfoString);
    return userInfoObject;
  }
}
