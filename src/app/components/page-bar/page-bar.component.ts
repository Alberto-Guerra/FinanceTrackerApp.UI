import { Component, EventEmitter, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faHouse,faList } from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs';


@Component({
  selector: 'app-page-bar',
  templateUrl: './page-bar.component.html',
  styleUrls: ['./page-bar.component.css']
})
export class PageBarComponent {
  faHome = faHouse;
  faCategories = faList;

  @Output() updateList : EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router) {
 
  }


  navigateToHome(){
    this.router.navigateByUrl('/');
    setTimeout(() => {
      this.updateList.emit();
    }, 0);
  }


  navigateToCategories(){
    this.router.navigateByUrl('/categories');
    setTimeout(() => {
      this.updateList.emit();
    }, 0);
  }
}
