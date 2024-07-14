// src/app/services/customer.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ICustomer } from '../shard/Models/customer';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'assets/db.json'; // Path to db.json file

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<ICustomer[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(data => data.customers)
    );
  }
}
