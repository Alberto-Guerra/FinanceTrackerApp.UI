import { Component, HostListener } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  mobileMode: boolean = false;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.mobileMode = window.innerWidth < 900;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.mobileMode = window.innerWidth < 900;
  }

  isLoggedIn(){

    return this.auth.isLoggedIn();
  }
  logout(){
    console.log(this.auth.getToken());
    this.auth.logout();
  }
}
