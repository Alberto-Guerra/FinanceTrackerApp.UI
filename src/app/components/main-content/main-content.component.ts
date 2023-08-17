import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Transaction } from 'src/app/models/Transaction';
import { DaySelector } from 'src/app/services/time-selectors/day-selector';
import { TimeSelector } from 'src/app/services/time-selectors/time-selector';
import { WeekSelector } from 'src/app/services/time-selectors/week-selector';
import { TransactionListComponent } from '../transaction-list/transaction-list.component';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent {
  @Input() selector: TimeSelector = new DaySelector();

  @Input() transactions : Transaction[] = [];

  @Output() updateTransactionList = new EventEmitter<Transaction[]>();


  ngOnInit(){
  }

  onOutletLoaded(component: TransactionListComponent) {
    console.log(this.transactions)
    component.selector = this.selector;
    component.transactions = this.transactions;
  }

  updateTransactions(transactions : Transaction[]){
    this.updateTransactionList.emit(transactions);
  }
}
