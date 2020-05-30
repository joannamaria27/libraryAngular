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
  randomstring = Math.random().toString(36).slice(-8);

  NewUser: LibraryUser = { username: "", id: undefined, RentedBooks: [], email: "", admin: false, password: this.randomstring };

  constructor(private connection: ConnectionService, private router: Router, private location: Location,
    private activatedRoute: ActivatedRoute, ) { }




  ngOnInit() {
  }


  BackButtonClick() {
    this.location.back();
  }

  AddBookButtonClick() {
    if (this.NewUser.username == null) {
      console.log("User's username is empty");
    } else if (this.NewUser.email == null) {
      console.log("User's email is empty");
    } else {
      this.connection.addUser(this.NewUser).subscribe(
        res => {
          console.log("Users added");
          this.router.navigate(['admin/users']);
        }, err => { console.log(err); })
    }
  }


}
