// src/app/components/customer-list/customer-list.component.ts
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers: any[] = [];
  transactions: any[] = [];
  filteredTransactions: any[] = [];
  @Output() customerSelected = new EventEmitter<number>();

  constructor(
    private customerService: CustomerService,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe(data => {
      this.customers = data;
    });
    this.transactionService.getTransactions().subscribe(data => {
      this.transactions = data;
      this.filteredTransactions = data;
    });
  }

  onCustomerChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const customerId = parseInt(selectElement.value, 10);
    this.filterTransactions(customerId);
  }

  filterTransactions(customerId: number | null): void {
    if (customerId !== null && customerId !== undefined) {
      this.filteredTransactions = this.transactions.filter(t => t.customer_id === customerId);
      this.customerSelected.emit(customerId);
    } else {
      this.filteredTransactions = [...this.transactions];
    }
  }
}
