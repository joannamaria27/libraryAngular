import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'src/app/Services/connection.service';
import { Router } from '@angular/router';
import { Author } from 'src/app/Model/Author';
import { Location } from '@angular/common'
@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {

  AuthorsCollection: Author[] = [];
  DisplayedAuthors: Author[] = [];
  SearchText: string;
  CanClear: boolean = false;
  AuthorsEmpty: boolean = true;
  constructor(
    private connection: ConnectionService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.connection.getAllAuthors().subscribe(
      res => {
        this.AuthorsCollection = [...res];
        if (this.AuthorsCollection.length != 0) {
          this.AuthorsEmpty = false;
        }
      },
      err => {
        console.log(err);
      }
    )
  }
  AddAuthorButtonClick() {
    this.router.navigate(['admin/authors-new']);
  }

  SearchClearButtonClick() {
    this.CanClear = false;
    this.SearchText = "";
    this.DisplayedAuthors = [...this.AuthorsCollection];
    if (this.AuthorsCollection.length != 0) {
      this.AuthorsEmpty = false;
    }
  }

  SearchButtonClick() {
    this.CanClear = true;
    this.DisplayedAuthors = [...this.AuthorsCollection];
    this.AuthorsEmpty = false;
    this.DisplayedAuthors = this.DisplayedAuthors.filter((element) => {
      return element.fullName.toLowerCase().includes(this.SearchText.toLowerCase());
    });
    if (this.DisplayedAuthors.length != 0) {
      this.AuthorsEmpty = false;
    }
  }

}
