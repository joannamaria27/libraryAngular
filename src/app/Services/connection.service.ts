import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Book } from '../Model/Book';
import { LibraryUser } from '../Model/LibraryUser';
import { Author } from '../Model/Author';
import {HttpHeaders} from '@angular/common/http'

const baseUrl='/api';

const httpOptions={
  headers:new HttpHeaders(
    {
      'Access-Control-Allow-Origin':'*',
      //'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      //'Origin':'http://localhost:8085',
      //'Access-Control-Request-Headers':' Accept, X-Requested-With',
      //'Access-Control-Allow-Credentials': 'true',
      //'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, token',
    }
  )
}

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private http:HttpClient) { }
 
  //BOOKS
  getAllBooks(){
    return this.http.get<Book[]>(`${baseUrl}/books`,httpOptions);
  }
  getAllBooksByTitle(title){
    return this.http.get<Book[]>(`${baseUrl}/books/title=${title}`,httpOptions);
  }
  getAllBooksByReleaseYear(year){
    return this.http.get<Book[]>(`${baseUrl}/books/year=${year}`,httpOptions);
  }
  getAllBooksByAuthorName(name)
  {
    return this.http.get<Book[]>(`${baseUrl}/books/author=${name}`,httpOptions);
  }
  getBookById(id)
  {
    return this.http.get<Book>(`${baseUrl}/books/${id}`,httpOptions);
  }
  deleteBookById(id)
  {
    return this.http.delete(`${baseUrl}/books/${id}`,httpOptions);
  }
  addBook(book)
  {
    return this.http.post<Book>(`${baseUrl}/books`,book,httpOptions);
  }
  updateBook(book)
  {
    return this.http.put(`${baseUrl}/books`,book,httpOptions);
  }
  //USERS
  getAllUsers(){
    return this.http.get<LibraryUser[]>(`${baseUrl}/admin/users`,httpOptions);
  }
  getAllUsersByName(name){
    return this.http.get<LibraryUser[]>(`${baseUrl}/admin/users/name=${name}`,httpOptions);
  }
  getUserById(id)
  {  
      return this.http.get<LibraryUser>(`${baseUrl}/admin/users/${id}`,httpOptions);
  }
  deleteUserById(id)
  {
    return this.http.delete(`${baseUrl}/admin/users/${id}`,httpOptions);
  }
  addUser(user)
  {
    return this.http.post<LibraryUser>(`${baseUrl}/admin/users`,user,httpOptions);
  }
  updateUser(user)
  {
    return this.http.put(`${baseUrl}/admin/users`,user,httpOptions);
  }
  //AUTHORS
  getAllAuthors()
  {
    return this.http.get<Author[]>(`${baseUrl}/authors`,httpOptions);
  }
  getAllAuthorsByName(name)
  {
    return this.http.get<Author[]>(`${baseUrl}/authors/name=${name}`,httpOptions);
  }
  getAuthorById(id)
  {
    return this.http.get<Author>(`${baseUrl}/authors/${id}`,httpOptions);
  }
  deleteAuthorById(id)
  {
    return this.http.delete(`${baseUrl}/authors/${id}`,httpOptions);
  }
  addAuthor(author)
  {
    return this.http.post<Author>(`${baseUrl}/authors`,author,httpOptions);
  }
  updateAuthor(author)
  {
    return this.http.put(`${baseUrl}/authors`,author,httpOptions);
  }
}
