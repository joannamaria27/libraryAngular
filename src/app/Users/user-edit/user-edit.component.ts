import { Component, OnInit } from "@angular/core";
import { ConnectionService } from "src/app/Services/connection.service";
import { Router, ActivatedRoute } from "@angular/router";
import { LibraryUser } from "src/app/Model/LibraryUser";
import { Location } from "@angular/common";
import { Book } from "src/app/Model/Book";

@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.css"],
})
export class UserEditComponent implements OnInit {
  constructor(
    private connection: ConnectionService,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) {}

  UserId: number;
  ThisUser: LibraryUser = {
    username: "",
    id: undefined,
    RentedBooks: [],
    email: "",
    admin: undefined,
    password: "",
  };
  OrginalUser: LibraryUser = {
    username: "",
    id: undefined,
    RentedBooks: [],
    email: "",
    admin: undefined,
    password: "",
  };
  DisableUpdateBtn: boolean = false;

  BooksAll: Book[] = [];
  BooksEmpty: boolean = true;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.UserId = Number.parseInt(params.get("id"));
      if (Number.isNaN(this.UserId)) {
        this.router.navigate(["admin/users-new"]);
      } else {
        this.connection.getUserById(this.UserId).subscribe(
          (res) => {
            this.ThisUser = res;
            this.OrginalUser = {
              id: undefined,
              username: res.username,
              RentedBooks: res.RentedBooks,
              email: res.email,
              admin: res.admin,
              password: res.password,
            };
            // if (this.OrginalUser.RentedBooks.length != 0) {
            //   this.Empty = false;
            // }
          },
          (err) => {
            console.log(err);
            this.router.navigate(["admin/users-new"]);
          }
        );
      }
    });
    this.connection.getAllBooks().subscribe(
      (res) => {
        this.BooksAll = [...res];
        if (this.BooksAll.length != 0) {
          this.BooksEmpty = false;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //dodać inne pola do edycji?
  UpdateBookButtonClick() {
    if (
      this.ThisUser.email == this.OrginalUser.email &&
      this.ThisUser.username == this.OrginalUser.username &&
      this.ThisUser.admin == this.OrginalUser.admin
    ) {
      this.location.back();
    } else {
      this.connection.updateUser(this.ThisUser).subscribe(
        (res) => {
          console.log("User updated succesfully");
          this.router.navigate(["admin/users"]);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  BackButtonClick() {
    this.location.back();
  }
}
