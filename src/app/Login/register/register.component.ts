import { Component, OnInit } from "@angular/core";
import { ConnectionService } from "src/app/Services/connection.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { LibraryUser } from "src/app/Model/LibraryUser";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  constructor(
    private connection: ConnectionService,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) {}

  NewUser: LibraryUser = {
    username: "",
    id: undefined,
    RentedBooks: [],
    email: "",
    admin: false,
    password: "",
  };

  ngOnInit() {}

  Enter() {
    if (this.NewUser.username == null) {
      console.log("User's username is empty");
    } else if (this.NewUser.email == null) {
      console.log("User's email is empty");
    } else if (this.NewUser.password == null) {
      console.log("User's password is empty");
    } else {
      this.connection.signUp(this.NewUser).subscribe(
        (res) => {
          console.log("Users added" + JSON.stringify(this.NewUser));
          this.router.navigate(["login"]);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  LoginButtonClick() {
    this.router.navigate(["login"]);
  }
}
