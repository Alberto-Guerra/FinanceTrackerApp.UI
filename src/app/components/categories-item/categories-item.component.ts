import { Component, Input } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { Transaction } from 'src/app/models/Transaction';
import { CommunicationService } from 'src/app/services/communication-service.service';
import { TimeSelector } from 'src/app/services/time-selectors/time-selector';
import { WeekSelector } from 'src/app/services/time-selectors/week-selector';
import { faPlus,faMinus, faEdit,faTrash} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-categories-item',
  templateUrl: './categories-item.component.html',
  styleUrls: ['./categories-item.component.css']
})
export class CategoriesItemComponent {

  @Input() category : Category = new Category();
  totalSpent : number = 0;

  selector : TimeSelector = new WeekSelector();
  transactions : Transaction[] = [];
  totalTransactions : Transaction[] = [];
  categorySpent : number = 0;
  percentage : string = '0';


  faMinus = faMinus;
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;


  constructor(private transactionService : TransactionService,private communicationService : CommunicationService, private router : Router){

  }

  ngOnInit(){
    

    this.communicationService.getSelector().subscribe((selector : TimeSelector) => {
      this.selector = selector;
      this.transactions = this.selector.getTransactions(this.category.transactions);
      this.totalSpent = -1 * this.selector.getSpent(this.totalTransactions);
      this.calculateSpent();
      this.calculatePercentage();
    });

    this.communicationService.getTransactions().subscribe((transactions : Transaction[]) => {

      this.totalTransactions = transactions;
      this.totalSpent = -1 * this.selector.getSpent(this.totalTransactions);
      this.calculateSpent();
      this.calculatePercentage();
    });
  }

  calculateSpent() : void {
    this.categorySpent = 0;
    this.transactions.forEach((transaction : Transaction) => {
      if(transaction.amount < 0){
        this.categorySpent +=  -1 * transaction.amount;
      }
    });
  }

  calculatePercentage() : void {

    if(this.totalSpent == 0){
      this.percentage = '0';
      return;
    }

    this.percentage = ((this.categorySpent / this.totalSpent) * 100).toFixed(0);

  }


  showSecondary : boolean = false;
  showSecondaryInfo(){
    this.showSecondary = !this.showSecondary;
  }

  editCategory(){
    if(!this.category){
      return;
    }
    this.communicationService.setCategoryToEdit(this.category);

    this.router.navigateByUrl('/edit-category');
  }

  deleteCategory(){
    if (!this.category || this.category.id == undefined) {
      return;
    }

    this.transactionService
      .deleteCategory(this.category)
      .subscribe((categories) => {
        this.communicationService.setCategories(categories);
      });
  }

}
