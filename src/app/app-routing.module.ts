import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainLayoutComponent} from './MainPage/main-layout/main-layout.component'
import {BookListComponent} from './Books/book-list/book-list.component'
import {BookAddComponent} from './Books/book-add/book-add.component'
import {BookDetailsComponent} from './Books/book-details/book-details.component'
import {BookEditComponent} from './Books/book-edit/book-edit.component'
import {LoginComponent} from './Login/login/login.component'
import {RegisterComponent} from './Login/register/register.component'
import {AuthorListComponent} from './Authors/author-list/author-list.component'
import {AuthorAddComponent} from './Authors/author-add/author-add.component'
import {AuthorEditComponent} from './Authors/author-edit/author-edit.component'
import {UserListComponent} from './Users/user-list/user-list.component'
import {UserAddComponent} from './Users/user-add/user-add.component'
import {UserEditComponent} from './Users/user-edit/user-edit.component'
import {AdminBookListComponent} from './Books/admin-book-list/admin-book-list.component'
import { AppComponent } from './app.component';
const routes: Routes = [
  {path:'', component:MainLayoutComponent},
  {path:'admin/users',component:UserListComponent},
  {path:'admin/users/:id',component:UserEditComponent},
  {path:'admin/users/new',component:UserAddComponent},
  {path:'books',component:BookListComponent},
  {path:'books/:id',component:BookDetailsComponent},
  {path:'admin/books/new',component:BookAddComponent},
  {path:'admin/books',component:AdminBookListComponent},
  {path:'admin/books/:id',component:BookEditComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'admin/authors',component:AuthorListComponent},
  {path:'admin/authors/:id',component:AuthorEditComponent},
  {path:'admin/authors/new',component:AuthorAddComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
