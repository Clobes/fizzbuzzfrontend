import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { FizzBuzzResponse } from '../interface/fizzbuzz';

@Injectable({
  providedIn: 'root'
})
export class FizzbuzzService {
  private readonly apiUrl = 'http://localhost:8080/intraway/api';

  constructor(private http: HttpClient) { }

  sendFizzBuzz(min: number, max: number) {
    return this.http.get<FizzBuzzResponse>(`${this.apiUrl}/fizzbuzz/${min}/${max}`);
}

}
