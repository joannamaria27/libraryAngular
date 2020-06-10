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
  BooksAll: Book[] = [];
  BooksAllEmpty: boolean;
  BooksAvailable: Book[] = [];
  BooksAvailableEmpty: boolean;
  BooksRented: Book[] = [];
  BooksRentedEmpty: boolean;
  BooksFilteredAutors: Book[] = [];
  BooksFilteredTitleDate: Book[] = [];
  UserId: number;
  UserIsAdmin: boolean;
  
  
  
  BooksEmpty: boolean = true;
  BooksCollection: Book[] = [];
  name: string;
  BooksEmptyA: boolean = true;
  BooksCollectionA: Book[] = [];
  DisplayedBooksA: Book[] = [];
  SearchTextA: string;
  CanClearA: boolean = false;
  constructor(
    private connection: ConnectionService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

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
        if(!this.BooksAllEmpty){
          this.BooksAvailable = [];
          this.BooksRented = [];
          this.BooksAll.filter((book) => {
            if(book.owner == null) this.BooksAvailable.push(book);
            else if(book.owner.id == this.UserId) this.BooksRented.push(book);
          })
          if(this.BooksAvailable.length == 0) this.BooksAvailableEmpty = true; else this.BooksAvailableEmpty = true;
          if(this.BooksAvailable.length == 0) this.BooksRentedEmpty = true; else this.BooksRentedEmpty = true;
        }
        console.log(JSON.stringify(this.BooksAll));
      },
      (err) => { console.log(err); }
    );


    this.DisplayedBooks = this.DisplayedBooks.filter((element) => {
      return (
        element.title.toLowerCase().includes(this.SearchText.toLowerCase()) ||
        element.releaseDate
          .toLowerCase()
          .includes(this.SearchText.toLowerCase())
      );
    });



    this.activatedRoute.paramMap.subscribe((params) => {
      if (Number.isNaN(this.id)) { this.router.navigate(["books"]);}
      else {
        this.connection.getLoggedUser(this.id).subscribe(
          (res) => { this.ThisUser = res; },
          (err) => { this.router.navigate([""]); }
        );
      }
    });
  }

  SearchClearAButtonClick() {
    this.CanClearA = false;
    this.SearchTextA = "";
    this.DisplayedBooksA = [...this.BooksCollectionA];
    if (this.BooksCollectionA.length != 0) {
      this.BooksEmptyA = false;
    }
  }

  SearchAButtonClick() {
    this.CanClearA = true;
    this.DisplayedBooksA = [...this.BooksCollectionA];
    this.BooksEmptyA = false;
    this.DisplayedBooksA = this.DisplayedBooksA.filter((element) => {
      return element.Authors.filter((element1) => {
        //console.log(element1.fullName);
        return element1.fullName
          .toLowerCase()
          .includes(this.SearchTextA.toLowerCase());
      });
    });
    if (this.DisplayedBooksA.length != 0) {
      this.BooksEmptyA = false;
    }
  }

  AddBookButtonClick() {
    this.router.navigate(["admin/books-new"]);
  }

  DisplayedBooks: Book[] = [];
  SearchText: string;
  CanClear: boolean = false;

  SearchClearButtonClick() {
    this.CanClear = false;
    this.SearchText = "";
    this.DisplayedBooks = [...this.BooksCollection];
    if (this.BooksCollection.length != 0) {
      this.BooksEmpty = false;
    }
  }

  SearchButtonClick() {
    this.CanClear = true;
    this.DisplayedBooks = [...this.BooksCollection];
    this.BooksEmpty = false;
    this.DisplayedBooks = this.DisplayedBooks.filter((element) => {
      return (
        element.title.toLowerCase().includes(this.SearchText.toLowerCase()) ||
        element.releaseDate
          .toLowerCase()
          .includes(this.SearchText.toLowerCase())
      );
    });
    if (this.DisplayedBooks.length != 0) {
      this.BooksEmpty = false;
    }
  }
}
