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

  Result: boolean;
  Searched: boolean = false;

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

  SearchTextTitleChanged() {
    this.CanClearT = this.SearchTextTitle == "";
    if (this.SearchTextAutor == "" || this.SearchTextAutor == undefined) this.Searched = false;
  }

  SearchTextAuthorChanged() {
    this.CanClearA = this.SearchTextAutor == "";
    if (this.SearchTextTitle == "" || this.SearchTextTitle == undefined) this.Searched = false;
  }
  
  SearchClearButtonClick() {
    this.SearchTextTitle = "";
    if (this.SearchTextAutor == "" || this.SearchTextAutor == undefined) this.Searched = false;
  }

  SearchClearAButtonClick() {
    this.SearchTextAutor = "";
    if (this.SearchTextTitle == "" || this.SearchTextTitle == undefined) this.Searched = false;
  }

  SearchAButtonClick() {
    this.BooksFilteredAutors = this.BooksAll.filter((book) => {
      this.Result = false;
      book.Authors.map((author) => {
        if (author.fullName.toLowerCase().includes(this.SearchTextAutor.toLowerCase())) this.Result = true;
      });
      return this.Result;
    });
    this.FilterBooks();
  }

  SearchButtonClick() {
    this.BooksFilteredTitle = this.BooksAll.filter((book) => {
      return (
        book.title.toLowerCase().includes(this.SearchTextTitle.toLowerCase()) ||
        book.releaseDate.toLowerCase().includes(this.SearchTextTitle.toLowerCase())
      );
    });
    this.FilterBooks();
  }

  FilterBooks() {
    this.Searched = true;

    if (this.UserIsAdmin) this.BooksFiltered = this.BooksAll;
    else this.BooksFiltered = this.BooksAvailable;

    this.BooksFiltered = this.BooksFiltered.filter((book) => this.BooksFilteredTitle.includes(book));
    this.BooksFiltered = this.BooksFiltered.filter((book) => this.BooksFilteredAutors.includes(book));
  }

  AddBookButtonClick() {
    this.router.navigate(["admin/books-new"]);
  }
}
