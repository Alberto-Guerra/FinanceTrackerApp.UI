import { Component, Input } from '@angular/core';
import{ faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent {

  @Input() spent?: number = 78.87;
  @Input() balance?: number = 100.00;
  @Input() time?: string = "this Week";

  showDiv: boolean [] = [true,false]
  actualDiv: number = 0;

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;


  getSpent() {
    if(this.spent == undefined){
      return 0;
    }
    if(this.spent < 0){
      return this.spent * -1;
    }
    return this.spent;
  }

  getBalance() {
    if(this.balance == undefined){
      return 0;
    }
    return this.balance;
  }

  goPrevious() {
    if(this.actualDiv > 0){
      this.actualDiv--;
      this.showDiv[this.actualDiv] = true;
      this.showDiv[this.actualDiv+1] = false;
    }
    else {
      this.actualDiv = this.showDiv.length-1;
      this.showDiv[this.actualDiv] = true;
      this.showDiv[0] = false;
    }
  }

  goNext() {
    if(this.actualDiv < this.showDiv.length-1){
      this.actualDiv++;
      this.showDiv[this.actualDiv] = true;
      this.showDiv[this.actualDiv-1] = false;
    }
    else {
      this.actualDiv = 0;
      this.showDiv[this.actualDiv] = true;
      this.showDiv[this.showDiv.length-1] = false;
    }
  }
}

