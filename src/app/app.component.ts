import { Component } from "@angular/core";
import { LibraryUser } from "./Model/LibraryUser";
import { LoginComponent } from "./Login/login/login.component";
import { ConnectionService } from "./Services/connection.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "HybrydoweFront";

  constructor(private connection: ConnectionService, private router: Router) { }

  isAdmin: boolean;
  isLogin: boolean;

  ngOnInit() {
    this.isAdmin = localStorage.getItem("admin") == "true" ? true : false;
    this.isLogin = localStorage.getItem("admin") != null ? true : false;
  }


  Logout() {
    this.connection.removeHeader();
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    localStorage.removeItem("admin");
    this.isAdmin = false;
    this.isLogin = false;
    console.log("Users log out");
    this.router.navigate(["login"]);
  }
}
