import { Component, HostListener } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  mobileMode : boolean = false;
  
ngOnInit() {

  this.mobileMode = window.innerWidth < 900;
}


@HostListener('window:resize', ['$event'])
onResize() {

    this.mobileMode = window.innerWidth < 900;


}
}
