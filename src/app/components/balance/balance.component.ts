import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent {

  @Input() spent?: number = 78.87;
  @Input() time?: string = "this Week";

  showSpent : boolean = true;



  getSpent() {
    if(this.spent == undefined){
      return 0;
    }
    if(this.spent < 0){
      return this.spent * -1;
    }
    return this.spent;
  }
}

