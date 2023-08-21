import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from 'src/app/models/Transaction';
import { TransactionSample } from 'src/app/models/TransactionSample';
import { CommunicationService } from 'src/app/services/communication-service.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.css']
})
export class EditTransactionComponent {

  

  constructor(private transactionService : TransactionService, private communicationService : CommunicationService, private router : Router) { }
  transaction: TransactionSample = new TransactionSample();
  ngOnInit(): void {
    this.transaction.setTransaction(this.communicationService.getTransactionToEdit());
    if(!this.transaction.name){
      this.router.navigateByUrl('/');
    }
  }


functionToPass : Function = (transaction : Transaction) => {
  this.transactionService.updateTransaction(transaction).subscribe((transactions : Transaction[]) => {
    this.communicationService.setAllTransactions(transactions);
  });
}
}
