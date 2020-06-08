import { Component, OnInit, Input } from "@angular/core";
import { ConnectionService } from "src/app/Services/connection.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { LibraryUser } from "src/app/Model/LibraryUser";
import { element } from "protractor";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  static CUser: LibraryUser = {
    username: "",
    id: undefined,
    RentedBooks: [],
    email: "",
    admin: undefined,
    password: "",
  };
  static isLogin: boolean = false;
  ThisUser: LibraryUser = {
    username: "",
    id: undefined,
    RentedBooks: [],
    email: "",
    admin: undefined,
    password: "",
  };
  UserId: number;

  constructor(
    private connection: ConnectionService,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) {}

  UsersCollection: LibraryUser[] = [];
  DisplayedUsers: LibraryUser[] = [];
  UsersEmpty: boolean = true;

  ngOnInit() {
    this.connection.getAllUsers().subscribe(
      (res) => {
        this.UsersCollection = [...res];
        if (this.UsersCollection.length != 0) {
          this.UsersEmpty = false;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  Enter() {
    if (this.ThisUser.username == null) {
      console.log("User's username is empty");
    } else if (this.ThisUser.password == null) {
      console.log("User's password is empty");
    } else {
      this.connection.login(this.ThisUser).subscribe(
        (res) => {
          this.connection.addHeader(res.jwt);
          console.log("Users login" + JSON.stringify(this.ThisUser));
          //console.log(this.connection.getHeaders().get("Authorization"));
          this.router.navigate(["books"]);
        },
        (err) => {
          console.log(err);
        }
      );

      // this.DisplayedUsers = [...this.UsersCollection];
      // this.UsersEmpty = false;
      // this.DisplayedUsers.find((element) => {
      //   element.username.includes(this.ThisUser.username);
      //   if (element.password == this.ThisUser.password) {
      //     console.log("login: " + this.ThisUser.username);
      //     LoginComponent.isLogin = true;
      //     LoginComponent.CUser = this.ThisUser;
      //     this.router.navigate(["books"]);
      //   } else {
      //     console.log("bad data");
      //   }
      // });
    }
  }
  RegButtonClick() {
    this.router.navigate(["register"]);
  }
}
