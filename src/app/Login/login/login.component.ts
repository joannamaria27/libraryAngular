import { Component, OnInit, Input } from '@angular/core';
import { ConnectionService } from 'src/app/Services/connection.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { LibraryUser } from 'src/app/Model/LibraryUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  static CUser: LibraryUser = { username: "", id: undefined, RentedBooks: [], email: "", admin: undefined, password: "" };
  static isLogin: boolean = false;
  ThisUser: LibraryUser = { username: "", id: undefined, RentedBooks: [], email: "", admin: undefined, password: "" };
  UserId: number;

  constructor(private connection: ConnectionService, private router: Router, private location: Location,
    private activatedRoute: ActivatedRoute, ) { }


  ngOnInit() {
    //to dooooo
  }

  Enter() {
    if ((this.ThisUser.password == LoginComponent.CUser.password) && (this.ThisUser.username == LoginComponent.CUser.username)) {
      console.log("login: " + LoginComponent.CUser.admin);
      LoginComponent.isLogin = true;
      this.router.navigate(['books']);
    } else { console.log("bad data"); }
  }


  RegButtonClick() {
    this.router.navigate(['register']);
  }

}
