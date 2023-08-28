import { Component, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @Output () isMobile : boolean = false;

  constructor( private auth : AuthService) { 

  }

  showLogin : boolean = true;

  username : string = "";
  password : string = "";


  login(): void {
    this.auth.login(this.username, this.password).subscribe((response) => {
      const token = response.token;
      this.auth.setToken(token);
    });
  }

  register(): void {
    this.auth.register(this.username, this.password).subscribe();

    alert("User " + this.username + " registered!");

    this.showLogin = true;
    this.username = "";
    this.password = "";
  }

}
