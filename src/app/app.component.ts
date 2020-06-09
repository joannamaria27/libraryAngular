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

  constructor(private connection: ConnectionService, private router: Router) {}

  ngOnInit() {}

  Logout() {
    this.connection.removeHeader();
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    
    console.log("Users log out");
    this.router.navigate(["login"]);
  }
}
