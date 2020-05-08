import { Component, OnInit, Input } from '@angular/core';
import { ConnectionService } from 'src/app/Services/connection.service';
import { Router } from '@angular/router';
import { Author } from 'src/app/Model/Author';

@Component({
  selector: 'app-author-list-element',
  templateUrl: './author-list-element.component.html',
  styleUrls: ['./author-list-element.component.css']
})
export class AuthorListElementComponent implements OnInit {

  constructor(
    private connection:ConnectionService,
    private router:Router,
    ) { }
    BookQuantity:number;
  ngOnInit() {
    if(this.ThisAuthor.Books!=null)
    {
      this.BookQuantity=this.ThisAuthor.Books.length;
    }
    else
    {
      this.ThisAuthor.Books=[];
      this.BookQuantity=0;
    }
    //this.BookQuantity=this.ThisAuthor.Books.length;
  }
  
  @Input() ThisAuthor:Author;  

  DetailsButtonClick(){
    this.router.navigate([`admin/authors/${this.ThisAuthor.id}`]);
  }
  DeleteButtonClick(){
    this.connection.deleteAuthorById(this.ThisAuthor.id).subscribe(
      res=>{
        window.location.reload();
        console.log("Author deleted succesfully");
      },
      err=>{
        console.log("Cannot delete author reason: "+err);
      }
    )
  }
}
