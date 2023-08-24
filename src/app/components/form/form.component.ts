import { Component, Input, Output} from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/Category';
import { Transaction } from 'src/app/models/Transaction';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { TransactionSample } from 'src/app/models/TransactionSample';
import { CommunicationService } from 'src/app/services/communication-service.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  @Input() transaction : TransactionSample = new TransactionSample()
  @Input() submitButtonText : string = "Submit";
  @Input() onSumbitFunction : Function = () => {console.log("onSubmitFunction not set")};

  faAdd = faAdd;



  allCategories : Category[] = [];
  categoriesToShow : Category[] = [];

  categoryToAdd? : number;


  constructor(private transactionService : TransactionService, private communicationService : CommunicationService, private router : Router) { }

  ngOnInit() {

    this.communicationService.getCategories().subscribe((categories : Category[]) => {
      this.allCategories = categories;
      this.updateCategories(this.allCategories);
    });
  }

  updateCategories(categories : Category[]){
    this.categoriesToShow = [];
    for(let category of categories){
      if(!this.transaction.categories.find((categorySelected) => categorySelected.id == category.id)){
        this.categoriesToShow.push(category);
      }
    }
    if(this.categoriesToShow.length > 0)
      this.categoryToAdd = this.categoriesToShow[0].id;
  }


  onSubmit() {
    
    if(!this.transaction.name){
      alert("Please enter name");
      return;
    }
    if(!this.transaction.amount){
      alert("Please enter amount");
      return;
    }
    if(!this.transaction.description){
      this.transaction.description = ""
    }

    this.onSumbitFunction(this.transaction.getTransaction());

    /* if(this.categoryToAdd){
      this.transactionService.addCategory(this.categoryToAdd).subscribe((transaction : Transaction[]) => {
        this.communicationService.setAllCategories(categories);
      });
    } */

    this.router.navigateByUrl('/transactions');


  }

  doTextareaValueChange(ev : any) {
    try {
      this.transaction.description = ev.target.value;
    } catch(e) {
      console.info('could not set textarea-value');
    }
  }

  addCategory(){

    var category = this.allCategories.find((category) => category.id == this.categoryToAdd);

    if(!category){
      return;
    }
    this.transaction.categories.push(category);
    this.updateCategories(this.allCategories);
  }

  removeCategory(category : Category){
    this.transaction.categories = this.transaction.categories.filter((categorySelected) => categorySelected.id != category.id);
    this.updateCategories(this.allCategories);

  }



}
