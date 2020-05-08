import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/Model/Author';
import { Book } from 'src/app/Model/Book';
import { ConnectionService } from 'src/app/Services/connection.service';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
@Component({
  selector: 'app-author-add',
  templateUrl: './author-add.component.html',
  styleUrls: ['./author-add.component.css']
})
export class AuthorAddComponent implements OnInit {

  NewAuthor:Author={fullName:"",id:undefined,Books:[]};
  constructor(
    private connection:ConnectionService,
    private router:Router,
    private location:Location,) { }

  ngOnInit() {
  }

  BackButtonClick(){
    this.location.back();
  }

  AddAuthorButtonClick()
  {
    
    if(this.NewAuthor.fullName=="")
    {
      console.log("Author's name is empty");
    }
    else
    {
      this.connection.addAuthor(this.NewAuthor).subscribe(
        res=>{
          console.log("Author added");
          this.router.navigate(['/admin/authors']);
        },
        err=>
        {
          console.log(err);
        }
      )
    }
  }
}
