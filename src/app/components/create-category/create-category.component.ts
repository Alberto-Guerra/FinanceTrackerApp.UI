import { Component } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { CommunicationService } from 'src/app/services/communication-service.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent {

  constructor(private transactionService : TransactionService, private communicationService : CommunicationService) { }


  functionToPass : Function = (category : Category) => {
    this.transactionService.addCategory(category).subscribe((categories : Category[]) => {
      this.communicationService.setCategories(categories);
    });
}
}
