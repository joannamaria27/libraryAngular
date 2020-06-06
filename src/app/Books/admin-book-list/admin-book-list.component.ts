import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/app/Model/Book';
import { ConnectionService } from 'src/app/Services/connection.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-book-list',
  templateUrl: './admin-book-list.component.html',
  styleUrls: ['./admin-book-list.component.css']
})
export class AdminBookListComponent implements OnInit {
  BooksEmpty: boolean = true;
  BooksCollection: Book[] = [];
  name: string;
  BooksEmptyA: boolean = true;
  BooksCollectionA: Book[] = [];
  DisplayedBooksA: Book[] = [];
  SearchTextA: string;
  CanClearA: boolean = false;
  constructor(private connection: ConnectionService, private router: Router, ) { }

  ngOnInit() {
    this.connection.getAllBooksByAuthorName(name).subscribe(
      res => {
        this.BooksCollectionA = [...res];
        if (this.BooksCollectionA.length != 0) {
          this.BooksEmptyA = false;
        }
      }, err => { console.log(err); })

    this.connection.getAllBooks().subscribe(
      res => {
        this.BooksCollection = [...res];
        if (this.BooksCollection.length != 0) {
          this.BooksEmpty = false;
        }
      }, err => { console.log(err); })
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
        return element1.fullName.toLowerCase().includes(this.SearchTextA.toLowerCase());
      });
    });
    if (this.DisplayedBooksA.length != 0) { this.BooksEmptyA = false; }
  }


  AddBookButtonClick() {
    this.router.navigate(['admin/books-new']);
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
      return element.title.toLowerCase().includes(this.SearchText.toLowerCase()) || element.releaseDate.toLowerCase().includes(this.SearchText.toLowerCase());
    });
    if (this.DisplayedBooks.length != 0) {
      this.BooksEmpty = false;
    }
  }



}


