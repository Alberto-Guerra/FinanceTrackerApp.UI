import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Transaction } from 'src/app/models/Transaction';
import { faPlus,faMinus, faEdit,faTrash} from '@fortawesome/free-solid-svg-icons';
import { TransactionService } from 'src/app/services/transaction.service';
import { CommunicationService } from 'src/app/services/communication-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.css'],
})
export class TransactionItemComponent {
  @Input() transaction?: Transaction;

  @Output() updateTransactionList = new EventEmitter<Transaction[]>();

  badColorBackground : string = "#F8B2B2";
  goodColorBackground : string = "#C9F8B2";

  badColorBorder : string = "#F53737";
  goodColorBorder : string = "#71DF3B";

  showSecondary : boolean = false;



  faMinus = faMinus;
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;

  constructor(
    private transactionService: TransactionService,
    private communicationService: CommunicationService,
    private router : Router
  ) {}

  getAmount(): number {
    if (this.transaction) {
      return this.transaction.amount;
    } else {
      return 0;
    }
  }

  getAmountText(): string {
    if (!this.transaction) {
      return '';
    }

    var number = this.transaction.amount;

    if (number < 0) {
      return number.toString();
    }

    return '+' + number.toString();
  }

  deleteTransaction() {
    if (!this.transaction || this.transaction.id == undefined) {
      return;
    }

    this.transactionService
      .deleteTransaction(this.transaction)
      .subscribe((transactions) => {
        this.communicationService.setAllTransactions(transactions);
      });
  }

  showSecondaryInfo() {
    this.showSecondary = !this.showSecondary;
  }

  editTransaction(){
    if(!this.transaction){
      return;
    }
    this.communicationService.setTransactionToEdit(this.transaction);
    this.router.navigateByUrl('/edit-transaction');
  }

}
