import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'src/app/Services/connection.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Book } from 'src/app/Model/Book';
import { Author } from 'src/app/Model/Author';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  BookId: number;
  ThisBook: Book = { title: "", id: undefined, Authors: [], releaseDate: "", owner: undefined };
  DisableUpdateBtn: boolean = false;
  OriginalBook: Book = { title: "", id: undefined, Authors: [], releaseDate: "", owner: undefined };
  AuthorsAll: Author[] = [];
  AuthorsEmpty: boolean = true;

  constructor(private connection: ConnectionService, private router: Router, private location: Location,
    private activatedRoute: ActivatedRoute, ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      params => {
        this.BookId = Number.parseInt(params.get('id'));
        if (Number.isNaN(this.BookId)) {
          this.router.navigate(['admin/books-new']);
        }
        else {
          this.connection.getBookById(this.BookId).subscribe(
            res => {
              this.ThisBook = res;
              this.OriginalBook = { id: undefined, title: res.title, Authors: res.Authors, owner: res.owner, releaseDate: res.releaseDate };
            }, err => { console.log(err); this.router.navigate(['admin/books-new']); })
        }
      })
    this.connection.getAllAuthors().subscribe(
      res => {
        this.AuthorsAll = [...res];
        if (this.AuthorsAll.length != 0) {
          this.AuthorsEmpty = false;
        }
      }, err => { console.log(err); })
  }

  UpdateBookButtonClick() {
    if ((this.ThisBook.title == this.OriginalBook.title) && (this.ThisBook.Authors == this.OriginalBook.Authors) && (this.ThisBook.releaseDate == this.OriginalBook.releaseDate)) {
      this.location.back();
    }
    else {
      this.connection.updateBook(this.ThisBook).subscribe(
        res => {
          console.log("Book updated succesfully");
          this.router.navigate(['books'])
        }, err => {
          console.log(err);
        })
    }
  }

  BackButtonClick() {
    this.location.back();
  }

}
