import { Component, OnInit, Input } from "@angular/core";
import { ConnectionService } from "src/app/Services/connection.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { LibraryUser } from "src/app/Model/LibraryUser";
import { element } from "protractor";
import { AppComponent } from "src/app/app.component";

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
  ) { }

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
      (err) => { console.log(err); });
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
          localStorage.setItem("username", res.username);
          localStorage.setItem("id", res.id.toString());
          localStorage.setItem("admin", res.admin.toString());

          console.log("Users login" + JSON.stringify(this.ThisUser));
          // this.router.navigate(["books"]);
          location.replace("books");
        },
        (err) => { console.log(err); });
    }
  }

  RegButtonClick() {
    this.router.navigate(["register"]);
  }
}
