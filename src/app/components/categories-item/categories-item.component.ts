import { Component, Input } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { Transaction } from 'src/app/models/Transaction';
import { CommunicationService } from 'src/app/services/communication-service.service';
import { TimeSelector } from 'src/app/services/time-selectors/time-selector';
import { WeekSelector } from 'src/app/services/time-selectors/week-selector';
import { faPlus,faMinus, faEdit,faTrash} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { TransactionService } from 'src/app/services/transaction.service';
import { MonthSelector } from 'src/app/services/time-selectors/month-selector';

@Component({
  selector: 'app-categories-item',
  templateUrl: './categories-item.component.html',
  styleUrls: ['./categories-item.component.css']
})
export class CategoriesItemComponent {

  /* Icons */
  faMinus = faMinus;
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;


  @Input() category : Category = new Category();

  selector : TimeSelector = new MonthSelector();

  categorySpent : number = 0;

  constructor(private transactionService : TransactionService,private communicationService : CommunicationService, private router : Router){

  }

  ngOnInit(){
    

    this.communicationService.getAllTransactions().subscribe((transactions : Transaction[]) => {

      this.calculateSpent();
    });
  }

  calculateSpent() : void {
    this.categorySpent = -1 * this.selector.getSpent(this.category.transactions);
  }

  getPercentage() : string {
    return ((this.categorySpent / this.category.budget!) * 100).toFixed(2);
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
