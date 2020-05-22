import { Component, OnInit, Input } from '@angular/core';
import { ConnectionService } from 'src/app/Services/connection.service';
import { Router } from '@angular/router';
import { Book } from 'src/app/Model/Book';

@Component({
  selector: 'app-admin-book-list',
  templateUrl: './admin-book-list.component.html',
  styleUrls: ['./admin-book-list.component.css']
})
export class AdminBookListComponent implements OnInit {
  BAuthors: string = "";

  constructor(private connection: ConnectionService, private router: Router, ) { }

  @Input() ThisBook: Book;

  ngOnInit() {
    if (this.ThisBook.Authors != null) {
      this.ThisBook.Authors.forEach(element => {
        this.BAuthors += element.fullName + ", ";
      });
    }
    else {
      this.ThisBook.Authors = [];
      this.BAuthors = "brak";
    }
  }

  DetailsButtonClick() {
    this.router.navigate([`admin/books/${this.ThisBook.id}`]);
  }
  DeleteButtonClick() {
    this.connection.deleteBookById(this.ThisBook.id).subscribe(
      res => {
        window.location.reload();
        console.log("Book deleted succesfully");
      }, err => { console.log("Cannot delete book reason: " + err); })
  }
}
