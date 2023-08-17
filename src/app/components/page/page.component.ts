import { Component } from '@angular/core';
import { Transaction } from 'src/app/models/Transaction';
import { CommunicationService } from 'src/app/services/communication-service.service';
import { TimeSelector } from 'src/app/services/time-selectors/time-selector';
import { WeekSelector } from 'src/app/services/time-selectors/week-selector';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent {
  selector : TimeSelector = new WeekSelector();

  allTransactions : Transaction[] = [];
  transactions : Transaction[] = [];

  constructor(private transactionService: TransactionService, private communicationService : CommunicationService) {

  }

  ngOnInit() {
    this.transactionService.getTransactions().subscribe((transactions : Transaction[]) => {

      this.communicationService.getAllTransactions().subscribe((transactions : Transaction[]) => {
        this.allTransactions = transactions;
        this.update();
      });

      this.communicationService.getSelector().subscribe((selector : TimeSelector) => {
        this.selector = selector;
        this.update();
      });

      this.communicationService.getTransactions().subscribe((transactions : Transaction[]) => {
        this.transactions = this.selector.getTransactions(transactions);
      });

      this.communicationService.setAllTransactions(sortByDate(transactions));
      this.communicationService.setTransactions(this.selector.getTransactions(this.allTransactions));


      
      

      
  });
  
  }

  update(){
    this.communicationService.setTransactions(this.selector.getTransactions(this.allTransactions));

  }

  updateSelector(selector: TimeSelector) {
    
    this.communicationService.setSelector(selector);
  ;
}

  
}
function sortByDate(transactions: Transaction[]): Transaction[] {
  return transactions.sort((a,b) => { return new Date(b.date).getTime() - new Date(a.date).getTime()});
}

