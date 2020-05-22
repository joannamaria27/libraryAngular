import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'src/app/Services/connection.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Author } from 'src/app/Model/Author';
import { Location } from '@angular/common';
@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.css']
})
export class AuthorEditComponent implements OnInit {

  constructor(private connection: ConnectionService,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute, ) { }

  AuthorId: number;
  ThisAuthor: Author = { id: undefined, fullName: "", Books: [] };
  DisableUpdateBtn: boolean = false;
  OriginalAuthor: Author = { id: undefined, fullName: "", Books: [] };

  BackButtonClick() {
    this.location.back();
  }
  BooksEmpty: boolean = true;
  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(
      params => {
        this.AuthorId = Number.parseInt(params.get('id'));
        if (Number.isNaN(this.AuthorId)) {
          this.router.navigate(['admin/authors-new']);
        }
        else {
          this.connection.getAuthorById(this.AuthorId).subscribe(
            res => {
              this.ThisAuthor = res;
              this.OriginalAuthor = { id: undefined, fullName: res.fullName, Books: res.Books };
              if (this.OriginalAuthor.Books.length != 0) {
                this.BooksEmpty = false;
              }
            },
            err => {
              console.log(err);
              this.router.navigate(['admin/authors-new']);
            }
          )

        }
      }
    )
  }
  UpdateAuthorButtonClick() {
    if (this.ThisAuthor.fullName == this.OriginalAuthor.fullName) {
      this.location.back();
    }
    else {
      this.connection.updateAuthor(this.ThisAuthor).subscribe(
        res => {
          console.log("Author updated succesfully");
          this.router.navigate(['admin/authors'])
        },
        err => {
          console.log(err);
        }
      )
    }
  }
}
