import { Component } from '@angular/core';
import { LibraryUser } from './Model/LibraryUser';
import { LoginComponent } from './Login/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HybrydoweFront';
  hid: boolean = false;
  log: boolean = false;

  ngOnInit() { //trzeba chyba dodac guard'a 
    if (LoginComponent.CUser.admin == true) { this.hid = true; }
    else { this.hid = false; }

    if (LoginComponent.isLogin == true) { this.log = true; }
    else { this.log = false; }

  }

}
