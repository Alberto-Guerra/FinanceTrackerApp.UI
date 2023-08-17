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
  }

  onSubmit() {
    if(!this.transaction){
      alert("Transaction is undefined");
      return;
    }

    if(this.transaction.name == ''){
      alert("Please enter name");
      return;
    }
    if(this.transaction.amount == 0){
      alert("Please enter amount");
      return;
    }

    this.transactionService.updateTransaction(this.transaction.getTransaction()).subscribe((transactions : Transaction[]) => {
      this.communicationService.setAllTransactions(transactions);
      
    });

    
    this.router.navigateByUrl('/');

}
}
