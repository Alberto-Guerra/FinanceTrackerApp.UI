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

  newTransaction: TransactionSample = new TransactionSample();

  constructor(private transactionService : TransactionService, private communicationService : CommunicationService, private router : Router) { }

  onSubmit() {
    if(!this.newTransaction.name){
      alert("Please enter name");
      return;
    }
    if(!this.newTransaction.amount){
      alert("Please enter amount");
      return;
    }
    if(!this.newTransaction.description){
      this.newTransaction.description = ""
    }


    let transaction: Transaction = new Transaction();
    transaction.name = this.newTransaction.name;
    transaction.date = this.newTransaction.date;
    transaction.amount = this.newTransaction.amount;
    transaction.description = this.newTransaction.description;

    this.transactionService.addTransaction(transaction).subscribe((transactions : Transaction[]) => {
      this.communicationService.setAllTransactions(transactions);
      
    });

    
    this.router.navigateByUrl('/');

  }

}


