import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from 'src/app/models/Transaction';
import { TransactionSample } from 'src/app/models/TransactionSample';
import { CommunicationService } from 'src/app/services/communication-service.service';
import { TransactionService } from 'src/app/services/transaction.service';



@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.css']
})
export class CreateTransactionComponent {

  constructor(private transactionService : TransactionService, private communicationService : CommunicationService, private router : Router) { }


  functionToPass : Function = (transaction : Transaction) => {
    this.transactionService.addTransaction(transaction).subscribe((transactions : Transaction[]) => {
      this.communicationService.setAllTransactions(transactions);
    });
  }

}



