import { Component, OnInit, Input } from "@angular/core";
import { Book } from "src/app/Model/Book";
import { ConnectionService } from "src/app/Services/connection.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Author } from "src/app/Model/Author";
import { LibraryUser } from "src/app/Model/LibraryUser";

@Component({
  selector: "app-book-list",
  templateUrl: "./book-list.component.html",
  styleUrls: ["./book-list.component.css"],
})
export class BookListComponent implements OnInit {
  UserId: number;
  UserIsAdmin: boolean;

  BooksAll: Book[] = [];
  BooksAllEmpty: boolean;
  BooksAvailable: Book[] = [];
  BooksAvailableEmpty: boolean;
  BooksRented: Book[] = [];
  BooksRentedEmpty: boolean;

  BooksTemp: Book[] = [];
  BooksFiltered: Book[] = [];
  BooksFilteredEmpty: boolean;
  BooksFilteredAutors: Book[] = [];
  BooksFilteredTitle: Book[] = [];

  SearchTextAutor: string;
  CanClearA: boolean;
  SearchTextTitle: string;
  CanClearT: boolean;

  constructor(
    private connection: ConnectionService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ad: boolean = localStorage.getItem("admin") == "true" ? true : false;
  id: number = parseInt(localStorage.getItem("id"));
  ThisUser: LibraryUser = {
    username: "",
    id: undefined,
    RentedBooks: [],
    email: "",
    admin: undefined,
    password: "",
  };

  ngOnInit() {
    this.UserId = parseInt(localStorage.getItem("id"));
    this.UserIsAdmin = localStorage.getItem("admin") == "true" ? true : false;
    this.connection.getAllBooks().subscribe(
      (res) => {
        this.BooksAll = [...res];
        if (this.BooksAll.length == 0) this.BooksAllEmpty = true;
        else this.BooksAllEmpty = false;
        if (!this.BooksAllEmpty) {
          this.BooksAvailable = [];
          this.BooksRented = [];
          this.BooksAll.filter((book) => {
            if (book.owner == null) this.BooksAvailable.push(book);
            else if (book.owner.id == this.UserId) this.BooksRented.push(book);
          })
          if (this.BooksAvailable.length == 0) this.BooksAvailableEmpty = true; else this.BooksAvailableEmpty = true;
          if (this.BooksAvailable.length == 0) this.BooksRentedEmpty = true; else this.BooksRentedEmpty = true;
        }
        this.BooksFilteredAutors = [...this.BooksAll];
        this.BooksFilteredTitle = [...this.BooksAll];
      },
      (err) => { console.log(err); }
    );
  }

  SearchTextAuthorChanged() {
    this.CanClearA = this.SearchTextAutor == "";
  }
  SearchTextTitleChanged() {
    this.CanClearT = this.SearchTextTitle == "";
  }

  SearchClearButtonClick() {
    this.SearchTextTitle = "";
    this.BooksFilteredTitle = [...this.BooksAll];
  }

  SearchClearAButtonClick() {
    this.SearchTextAutor = "";
    this.BooksFilteredAutors = [...this.BooksAll];
  }

  SearchAButtonClick() {
    if (this.UserIsAdmin) {

      this.BooksFilteredAutors = this.BooksAll.filter((book) => {
        console.log(book.Authors);
        return book.Authors.filter((author) => {
          console.log(author);
          return author.fullName.toLowerCase().includes(this.SearchTextAutor.toLowerCase());
        });
      });
    }
    else {
      this.BooksFilteredAutors = this.BooksAvailable.filter((book) => {
        return book.Authors.filter((author) => {
          console.log(book.Authors);
          return author.fullName.toLowerCase().includes(this.SearchTextAutor.toLowerCase());
        });
      });
    }
    this.BooksFiltered = this.BooksFilteredAutors;



    //

    //

    console.log("BooksAll " + JSON.stringify(this.BooksAll));
    console.log("BooksAvailable " + JSON.stringify(this.BooksAvailable));
    console.log("BooksFilteredAutors " + JSON.stringify(this.BooksFilteredAutors));
    console.log("BooksFilteredTitle " + JSON.stringify(this.BooksFilteredTitle));
    console.log("BooksFiltered " + JSON.stringify(this.BooksFiltered));
  }

  SearchButtonClick() {
    if (this.UserIsAdmin) {
      this.BooksFilteredTitle = this.BooksAll.filter((book) => {
        return (
          book.title.toLowerCase().includes(this.SearchTextTitle.toLowerCase()) ||
          book.releaseDate.toLowerCase().includes(this.SearchTextTitle.toLowerCase())
        );
      });
    }
    else {
      this.BooksFilteredTitle = this.BooksAvailable.filter((book) => {
        return (
          book.title.toLowerCase().includes(this.SearchTextTitle.toLowerCase()) ||
          book.releaseDate.toLowerCase().includes(this.SearchTextTitle.toLowerCase())
        );
      });
    }
    this.BooksFiltered = this.BooksFilteredTitle;


    //

    //

    console.log("BooksAll " + JSON.stringify(this.BooksAll));
    console.log("BooksAvailable " + JSON.stringify(this.BooksAvailable));
    console.log("BooksFilteredAutors " + JSON.stringify(this.BooksFilteredAutors));
    console.log("BooksFilteredTitle " + JSON.stringify(this.BooksFilteredTitle));
    console.log("BooksFiltered " + JSON.stringify(this.BooksFiltered));
  }

  AddBookButtonClick() {
    this.router.navigate(["admin/books-new"]);
  }
}
