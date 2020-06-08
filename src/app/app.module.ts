import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BookAddComponent} from './Books/book-add/book-add.component'
import {BookEditComponent} from './Books/book-edit/book-edit.component'
import {BookDetailsComponent} from './Books/book-details/book-details.component'
import { BookListComponent } from './Books/book-list/book-list.component';
import { UserListComponent } from './Users/user-list/user-list.component';
import { UserAddComponent } from './Users/user-add/user-add.component';
import { UserEditComponent } from './Users/user-edit/user-edit.component';
import { AuthorListComponent } from './Authors/author-list/author-list.component';
import { AuthorEditComponent } from './Authors/author-edit/author-edit.component';
import { AuthorAddComponent } from './Authors/author-add/author-add.component';
import {MainLayoutComponent} from './MainPage/main-layout/main-layout.component'
import {AdminBookListComponent} from './Books/admin-book-list/admin-book-list.component'
import {LoginComponent} from './Login/login/login.component'
import {RegisterComponent} from './Login/register/register.component'
import { from } from 'rxjs';
import { ConnectionService, AddHeaderInterceptor } from './Services/connection.service';
import { AuthorListElementComponent } from './Authors/author-list-element/author-list-element.component';
import { BookListElementComponent } from './Books/book-list-element/book-list-element.component';
import { BookRentElementComponent } from './Books/book-rent-element/book-rent-element.component';
import { UserListElementComponent } from './Users/user-list-element/user-list-element.component';

@NgModule({
  declarations: [
    AppComponent,
    BookDetailsComponent,
    AdminBookListComponent,
    LoginComponent,
    RegisterComponent,
    BookEditComponent,
    BookAddComponent,
    BookListComponent,
    UserListComponent,
    UserAddComponent,
    UserEditComponent,
    AuthorListComponent,
    AuthorEditComponent,
    AuthorAddComponent,
    MainLayoutComponent,
    AuthorListElementComponent,
    BookListElementComponent,
    BookRentElementComponent,
    UserListElementComponent, 
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [ConnectionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddHeaderInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
