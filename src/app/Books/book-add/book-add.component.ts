import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/Model/Book';
import { LibraryUser } from 'src/app/Model/LibraryUser';
import { Router } from '@angular/router';
import { ConnectionService } from 'src/app/Services/connection.service';
import { Location } from '@angular/common';
import { Author } from 'src/app/Model/Author';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {
  NewBook: Book = { title: "", id: undefined, Authors: [], releaseDate: "", owner: undefined };

  AuthorsAll: Author[] = [];
  AuthorsEmpty: boolean = true;

  constructor(private connection: ConnectionService, private router: Router, private location: Location) { }

  ngOnInit() {
    this.connection.getAllAuthors().subscribe(
      res => {
        this.AuthorsAll = [...res];
        if (this.AuthorsAll.length != 0) {
          this.AuthorsEmpty = false;
        }
      }, err => { console.log(err); })
  }

  BackButtonClick() {
    this.location.back();
  }

  AddBookButtonClick() {
    if (this.NewBook.title == "") {
      console.log("Book's title is empty");
    }
    else if (this.NewBook.Authors == null) {
      console.log("Book's authors is empty");
    }
    else if (this.NewBook.releaseDate == null) {
      console.log("Book's data is empty");
    }
    else {
      this.connection.addBook(this.NewBook).subscribe(
        res => {
          console.log("Books added");
          this.router.navigate(["books"]);
        },
        err => { console.log(err); })
    }
  }

}

