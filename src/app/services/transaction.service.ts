// src/app/services/transaction.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ITransaction } from '../shard/Models/transaction';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'assets/db.json'; // Path to db.json file

  constructor(private http: HttpClient) {}

  getTransactions(): Observable<ITransaction[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(data => data.transactions)
    );
  }
}
