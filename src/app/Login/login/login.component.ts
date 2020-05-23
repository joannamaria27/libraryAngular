import { Component, OnInit } from '@angular/core';
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

  constructor(private connection: ConnectionService, private router: Router, private location: Location,
    private activatedRoute: ActivatedRoute, ) { }

  ThisUser: LibraryUser = { Username: "", id: undefined, RentedBooks: [], Email: "" };

  ngOnInit() {
  }

  Enter() {

  }

  BackButtonClick() {
    this.location.back();
  }

}
