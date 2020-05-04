import { Component, OnInit } from '@angular/core';
import { ConnectionService } from 'src/app/Services/connection.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author-list-element',
  templateUrl: './author-list-element.component.html',
  styleUrls: ['./author-list-element.component.css']
})
export class AuthorListElementComponent implements OnInit {

  constructor(
    private connection:ConnectionService,
    private router:Router,
    private location:Location,) { }

  ngOnInit() {
  }

}
