import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';
import { BookAddComponent } from './books/book-add/book-add.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    FormsModule,
    HttpClientModule,
    BookEditComponent,
    BookAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
