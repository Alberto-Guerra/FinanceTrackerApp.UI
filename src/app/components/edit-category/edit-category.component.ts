import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/Category';
import { CommunicationService } from 'src/app/services/communication-service.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent {

  constructor(private transactionService : TransactionService, private communicationService : CommunicationService, private router : Router) { }

  
  category: Category = new Category();

  
  ngOnInit(): void {
    this.category = this.communicationService.getCategoryToEdit();
    if(!this.category.name){
      this.router.navigateByUrl('/');
    }
  }


functionToPass : Function = (category : Category) => {
  this.transactionService.updateCategory(category).subscribe((categories : Category[]) => {
    this.communicationService.setCategories(categories);
  });

}
}
