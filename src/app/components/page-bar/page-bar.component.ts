import { Component, EventEmitter, Input, Output } from '@angular/core';
import {Router } from '@angular/router';
import { faHouse,faList, faMoneyBill, faChartSimple, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-page-bar',
  templateUrl: './page-bar.component.html',
  styleUrls: ['./page-bar.component.css']
})
export class PageBarComponent {
  faHome = faHouse;
  faCategories = faList;
  faMoneyBill = faMoneyBill;
  faChartSimple = faChartSimple;
  faLogout = faRightFromBracket;

  @Output() updateList : EventEmitter<any> = new EventEmitter<any>();
  @Input() mobileMode : boolean = window.innerWidth < 900;

  constructor(private router: Router, private auth : AuthService) {
 
  }


  navigateTo(url : string){
    this.router.navigateByUrl(url);
    setTimeout(() => {
      this.updateList.emit();
    }, 0);
  }

  logout(){
    this.auth.logout();
  }
}
