import { Component, OnInit, Input } from "@angular/core";
import { Book } from "src/app/Model/Book";
import { ConnectionService } from "src/app/Services/connection.service";
import { Router } from "@angular/router";
import { LibraryUser } from "src/app/Model/LibraryUser";

@Component({
  selector: "app-book-rent-element",
  templateUrl: "./book-rent-element.component.html",
  styleUrls: ["./book-rent-element.component.css"],
})
export class BookRentElementComponent implements OnInit {
  BAuthors: string = "";

  constructor(private connection: ConnectionService, private router: Router) {}

  @Input() ThisBook: Book;
  @Input() ThisUser: LibraryUser;

  Owner: boolean = false;

  ngOnInit() {
    if (this.ThisBook.CurrentOwner != null) {
      this.Owner = true;
    } else {
      this.Owner = false;
    }

    if (this.ThisBook.Authors != null) {
      this.ThisBook.Authors.forEach((element) => {
        this.BAuthors += element.fullName + ", ";
      });
    } else {
      this.ThisBook.Authors = [];
      this.BAuthors = "brak";
    }
  }

  RentButtonClick() {
    this.ThisBook.CurrentOwner = this.ThisUser; //nie wiem czy to tak działa :C
    //this.ThisUser.RentedBooks.push(this.ThisBook);
    this.connection.updateBook(this.ThisBook).subscribe(
      (res) => {
        console.log("Book updated succesfully");
        this.router.navigate(["books"]);
      },
      (err) => {
        console.log(err);
      }
    );
    // this.connection.updateUser(this.ThisBook).subscribe(
    //   res => {
    //     console.log("User updated succesfully");
    //     this.router.navigate(['admin/books'])
    //   }, err => {
    //     console.log(err);
    //   })
  }

  ReturnButtonClick() {
    this.ThisBook.CurrentOwner = null; //nie wiem czy to tak działa :C
    // const ind = this.ThisUser.RentedBooks.indexOf(this.ThisBook);
    // this.ThisUser.RentedBooks.splice(ind, 1);
    this.connection.updateBook(this.ThisBook).subscribe(
      (res) => {
        console.log("Book updated succesfully");
        this.router.navigate(["admin/books"]);
      },
      (err) => {
        console.log(err);
      }
    );
    // this.connection.updateUser(this.ThisBook).subscribe(
    //   res => {
    //     console.log("User updated succesfully");
    //     this.router.navigate(['admin/books'])
    //   }, err => {
    //     console.log(err);
    //   })
  }
}
