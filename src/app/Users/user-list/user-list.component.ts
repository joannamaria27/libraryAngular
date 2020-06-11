import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from 'src/app/Services/connection.service';
import { LibraryUser } from 'src/app/Model/LibraryUser';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  isLogin: boolean;

  constructor(private connection: ConnectionService, private router: Router,) { }
  UsersCollection: LibraryUser[] = [];
  UsersEmpty: boolean = true;

  ngOnInit() {
    this.connection.getAllUsers().subscribe(
      res => {
        this.UsersCollection = [...res];
        if (this.UsersCollection.length != 0) {
          this.UsersEmpty = false;
        }
      }, err => { console.log(err); })
  }
  AddUserButtonClick() {
    this.router.navigate(['admin/users-new']);
  }

  DisplayedUsers: LibraryUser[] = [];
  SearchText: string;
  CanClear: boolean = false;

  SearchClearButtonClick() {
    this.CanClear = false;
    this.SearchText = "";
    this.DisplayedUsers = [...this.UsersCollection];
    if (this.UsersCollection.length != 0) {
      this.UsersEmpty = false;
    }
  }

  SearchButtonClick() {
    this.CanClear = true;
    this.DisplayedUsers = [...this.UsersCollection];
    this.UsersEmpty = false;
    this.DisplayedUsers = this.DisplayedUsers.filter((element) => {
      return element.username.toLowerCase().includes(this.SearchText.toLowerCase());
    });
    if (this.DisplayedUsers.length != 0) {
      this.UsersEmpty = false;
    }
  }

}
