// src/app/components/transaction-graph/transaction-graph.component.ts
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
// import { Chart } from 'chart.js';
import { TransactionService } from '../../services/transaction.service';
import { ITransaction } from '../../shard/Models/transaction';

import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';
// import * as moment from 'moment';

@Component({
  selector: 'app-transaction-graph',
  templateUrl: './transaction-graph.component.html',
  styleUrls: ['./transaction-graph.component.css']
})
export class TransactionGraphComponent implements OnInit, OnChanges {
  @Input() customerId: number = 0;
  transactions: ITransaction[] = [];
  chart: any;

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe(data => {
      this.transactions = data;
      this.createChart();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['customerId'] && !changes['customerId'].isFirstChange()) {
      this.updateChart();
    }
  }

  createChart(): void {
    const ctx = document.getElementById('transactionChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'bar', // Changed to bar chart
      data: {
        labels: [],
        datasets: [{
          label: 'Transaction Amount',
          data: [],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          x: {
            beginAtZero: true
          },
          y: {
            beginAtZero: true
          }
        }
      }
    });
    this.updateChart();
  }

  updateChart(): void {
    if (this.chart) {
      const customerTransactions = this.transactions.filter(t => t.customer_id === this.customerId);
      const labels = customerTransactions.map(t => t.date);
      const data = customerTransactions.map(t => t.amount);

      this.chart.data.labels = labels;
      this.chart.data.datasets[0].data = data;
      this.chart.update();
    }
  }
}
