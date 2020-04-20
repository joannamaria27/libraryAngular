import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
