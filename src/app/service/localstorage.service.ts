import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() {}

  getItem(key: string): any {
    return localStorage.getItem(key);
  }

  setItem(key: string, val: any) {
    localStorage.setItem(key, val);
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}
