import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestRegExpService {
  constructor() { }

  testString(str: string, regex: string): number {
    return new RegExp(regex).test(str) ? 1 : 0;
  }
}