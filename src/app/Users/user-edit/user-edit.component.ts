import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'src/app/Services/connection.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LibraryUser } from 'src/app/Model/LibraryUser';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  constructor(private connection: ConnectionService, private router: Router, private location: Location,
    private activatedRoute: ActivatedRoute, ) { }

  UserId: number;
  ThisUser: LibraryUser = { username: "", id: undefined, RentedBooks: [], email: "" };
  OrginalUser: LibraryUser = { username: "", id: undefined, RentedBooks: [], email: "" };


  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      params => {
        this.UserId = Number.parseInt(params.get('id'));
        if (Number.isNaN(this.UserId)) {
          this.router.navigate(['admin/users-new']);
        }
        else {
          this.connection.getUserById(this.UserId).subscribe(
            res => {
              this.ThisUser = res;
              this.OrginalUser = { id: undefined, username: res.username, RentedBooks: undefined, email: res.email };
            }, err => { console.log(err); this.router.navigate(['admin/users-new']); }
          )
        }
      })
  }


  //dodać inne pola do edycji?
  UpdateBookButtonClick() {
    if ((this.ThisUser.email == this.OrginalUser.email) && (this.ThisUser.username == this.OrginalUser.username)) {
      this.location.back();
    }
    else {
      this.connection.updateUser(this.ThisUser).subscribe(
        res => {
          console.log("User updated succesfully");
          this.router.navigate(['admin/users'])
        }, err => {
          console.log(err);
        })
    }
  }

  BackButtonClick() {
    this.location.back();
  }

}
