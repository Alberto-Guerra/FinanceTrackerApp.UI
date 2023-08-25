import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Transaction } from 'src/app/models/Transaction';
import { CommunicationService } from 'src/app/services/communication-service.service';
import { TimeSelector } from 'src/app/services/time-selectors/time-selector';
import { WeekSelector } from 'src/app/services/time-selectors/week-selector';
import { TransactionService } from 'src/app/services/transaction.service';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/Category';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent {
  
  title : string = "Categories";
  buttonText : string = "New Category";

  categories : Category[] = [];

  createCategoryFunction : Function = () => {this.router.navigateByUrl('/create-category')};

  constructor(private communicationService : CommunicationService, private router: Router) {

  }

  ngOnInit() {  

    this.communicationService.getCategories().subscribe((categories : Category[]) => {
      this.categories = categories;
    });

    this.communicationService.getAllTransactions().subscribe(() => {

      this.communicationService.getCategories().subscribe((categories : Category[]) => {
        this.categories = categories;
      });
      
    });



  }


}
