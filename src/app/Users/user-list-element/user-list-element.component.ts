import { Component, OnInit, Input } from '@angular/core';
import { ConnectionService } from 'src/app/Services/connection.service';
import { Router } from '@angular/router';
import { LibraryUser } from 'src/app/Model/LibraryUser';

@Component({
  selector: 'app-user-list-element',
  templateUrl: './user-list-element.component.html',
  styleUrls: ['./user-list-element.component.css']
})
export class UserListElementComponent implements OnInit {

  @Input() ThisUser: LibraryUser;

  Quantity: number;
  constructor(private connection: ConnectionService, private router: Router, ) { }

  ngOnInit() {
    if (this.ThisUser.RentedBooks != null) {
      this.Quantity = this.ThisUser.RentedBooks.length;
    }
    else {
      this.ThisUser.RentedBooks = [];
      this.Quantity = 0;
    }
  }

  DetailsButtonClick() {
    this.router.navigate([`admin/users/${this.ThisUser.id}`]);
  }

  DeleteButtonClick() {
    this.connection.deleteUserById(this.ThisUser.id).subscribe(
      res => {
        window.location.reload();
        console.log("User deleted succesfully");
      },
      err => { console.log("Cannot delete user reason: " + err); })
  }
}
