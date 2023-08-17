import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Transaction } from 'src/app/models/Transaction';
import { CommunicationService } from 'src/app/services/communication-service.service';
import { TimeSelector } from 'src/app/services/time-selectors/time-selector';
import { WeekSelector } from 'src/app/services/time-selectors/week-selector';
import { TransactionService } from 'src/app/services/transaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent {
  title : string = "Last Transactions";
  buttonText : string = "New Transaction";

  @Input() selector: TimeSelector = new WeekSelector();

  @Input() transactions : Transaction[] = [];
  @Output() updateTransactionList = new EventEmitter<Transaction[]>();
  transactionsToShow: Transaction[] = [];

  createTransactionFunction : Function = () => {this.router.navigateByUrl('/create-transaction')};

  constructor(private transactionService: TransactionService, private communicationService : CommunicationService, private router: Router) {

  }

  ngOnInit() {  

    this.communicationService.getTransactions().subscribe((transactions : Transaction[]) => {
      this.transactions = transactions;
      this.updateTitleAndButtons();
      this.showAll();
      
    });
    this.communicationService.getSelector().subscribe((selector : TimeSelector) => {
      this.selector = selector;
    });


  }

  updateTitleAndButtons() {
    
    this.title = "Last Transactions"
    this.showTransactionsButton = false;
    this.showIncomeButton = true;
    this.showExpensesButton = true;
    
  }

  showTransactionsButton : boolean = false;

  showAll(){
      
      this.transactionsToShow = this.transactions;
      this.title = "Last Transactions";
      this.showTransactionsButton = false;
      this.showIncomeButton = true;
      this.showExpensesButton = true;
    
    }
  

  showExpensesButton : boolean = true;
  showExpenses(){

      this.transactionsToShow = this.selector.getExpenses(this.transactions);
      this.title = "Last Expenses";

      this.showTransactionsButton = true;
      this.showIncomeButton = true;
      this.showExpensesButton = false;

    
  }
  showIncomeButton : boolean = true;
  showIncome(){
      this.transactionsToShow = this.selector.getIncome(this.transactions)
      this.title = "Last Income";

      this.showTransactionsButton = true;
      this.showIncomeButton = false;
      this.showExpensesButton = true;
    
  }




  

}
