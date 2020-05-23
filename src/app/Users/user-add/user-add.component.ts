import { Component, OnInit } from '@angular/core';
import { LibraryUser } from 'src/app/Model/LibraryUser';
import { ConnectionService } from 'src/app/Services/connection.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  NewUser: LibraryUser = { Username: "", id: undefined, RentedBooks: [], Email: "" };

  constructor(private connection: ConnectionService, private router: Router, private location: Location,
    private activatedRoute: ActivatedRoute, ) { }

  ngOnInit() {
  }


  BackButtonClick() {
    this.location.back();
  }

}
