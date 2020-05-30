import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/app/Model/Book';
import { ConnectionService } from 'src/app/Services/connection.service';
import { Router } from '@angular/router';
import { Author } from 'src/app/Model/Author';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  BooksEmpty: boolean = true;
  BooksCollection: Book[] = [];
  AuthorsAll: Author[] = [];
  AuthorsEmpty: boolean = true;

  constructor(private connection: ConnectionService, private router: Router, ) { }

  BooksCollectionUser: Book[] = [];
  BooksCollectionUserEmpty: boolean = false;

  ngOnInit() {

    this.connection.getAllBooks().subscribe(
      res => {
        this.BooksCollection = [...res];
        if (this.BooksCollection.length != 0) {
          this.BooksEmpty = false;
        }
      }, err => { console.log(err); })
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