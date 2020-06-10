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

  constructor(private connection: ConnectionService, private router: Router) { }

  @Input() ThisBook: Book;

  Owner: boolean = false;
  ThisUser: LibraryUser = {
    username: "",
    id: undefined,
    RentedBooks: [],
    email: "",
    admin: undefined,
    password: "",
  };
  OrginalUser: LibraryUser = {
    username: "",
    id: undefined,
    RentedBooks: [],
    email: "",
    admin: undefined,
    password: "",
  };

  ngOnInit() {
    if (this.ThisBook.owner != null) { this.Owner = true; }
    else { this.Owner = false; }

    if (this.ThisBook.Authors != null) {
      this.ThisBook.Authors.forEach((element) => {
        this.BAuthors += element.fullName + ", ";
      });
    } else {
      this.ThisBook.Authors = [];
      this.BAuthors = "brak";
    }
  }

  user: string = localStorage.getItem("username");

  RentButtonClick() {
    this.connection.borrow(this.ThisBook.id, this.user).subscribe(
      (res) => {
        console.log("Book rented succesfully");
        window.location.reload();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ReturnButtonClick() {
    this.connection.return(this.ThisBook.id).subscribe(
      (res) => {
        console.log("Book return succesfully");
        window.location.reload();
      },
      (err) => {
        console.log(err);
      }

    );
  }
}
