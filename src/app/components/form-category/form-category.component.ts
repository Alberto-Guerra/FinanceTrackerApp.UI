import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/Category';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.css']
})
export class FormCategoryComponent {
  @Input() category: Category = new Category();

  @Input() onSumbitFunction: Function = () => { console.log("onSubmitFunction not set") };
  @Input() submitButtonText: string = "Submit";

  constructor(private router : Router){

  }

  public onSubmit(): void {
    if(!this.category.name){
      alert("Please enter name");
      return;
    }

    if(!this.category.description){
      this.category.description = ""
    }

    this.onSumbitFunction(this.category);

    this.router.navigateByUrl('/categories');
  }

}
