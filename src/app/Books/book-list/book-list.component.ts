import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'src/app/Services/connection.service';
import { Router } from '@angular/router';
import { Book } from 'src/app/Model/Book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  BooksEmpty: boolean = true;
  BooksCollection: Book[] = [];

  constructor(private connection: ConnectionService, private router: Router, ) { }

  ngOnInit() {
    this.connection.getAllBooks().subscribe(
      res => {
        this.BooksCollection = [...res];
        if (this.BooksCollection.length != 0) {
          this.BooksEmpty = false;
        }
      }, err => { console.log(err); })
  }

  AddBookButtonClick() {
    this.router.navigate(['admin/books-new']);
  }
}
