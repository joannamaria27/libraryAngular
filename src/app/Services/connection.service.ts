import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

const baseUrl='http:localhost:8085'

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private http:HttpClient) { }

  //BOOKS
  getAllBooks(){
    return this.http.get(`${baseUrl}/books`);
  }
  getAllBooksByTitle(title){
    return this.http.get(`${baseUrl}/books/title=${title}`);
  }
  getAllBooksByReleaseYear(year){
    return this.http.get(`${baseUrl}/books/year=${year}`);
  }
  getAllBooksByAuthorName(name)
  {
    return this.http.get(`${baseUrl}/books/author=${name}`);
  }
  getBookById(id)
  {
    return this.http.get(`${baseUrl}/books/${id}`);
  }
  deleteBookById(id)
  {
    return this.http.delete(`${baseUrl}/books/${id}`);
  }
  addBook(book)
  {
    return this.http.post(`${baseUrl}/books`,book);
  }
  updateBook(book)
  {
    return this.http.put(`${baseUrl}/books`,book);
  }
  //USERS
  getAllUsers(){
    return this.http.get(`${baseUrl}/admin/users`);
  }
  getAllUsersByName(name){
    return this.http.get(`${baseUrl}/admin/users/name=${name}`);
  }
  getUserById(id)
  {  
      return this.http.get(`${baseUrl}/admin/users/${id}`);
  }
  deleteUserById(id)
  {
    return this.http.delete(`${baseUrl}/admin/users/${id}`);
  }
  addUser(user)
  {
    return this.http.post(`${baseUrl}/admin/users`,user);
  }
  updateUser(user)
  {
    return this.http.put(`${baseUrl}/admin/users`,user);
  }
  //AUTHORS
  getAllAuthors()
  {
    return this.http.get(`${baseUrl}/authors`);
  }
  getAllAuthorsByName(name)
  {
    return this.http.get(`${baseUrl}/authors/name=${name}`);
  }
  getAuthorById(id)
  {
    return this.http.get(`${baseUrl}/authors/${id}`);
  }
  deleteAuthorById(id)
  {
    return this.http.delete(`${baseUrl}/authors/${id}`);
  }
  addAuthor(author)
  {
    return this.http.post(`${baseUrl}/authors`,author);
  }
  updateAuthor(author)
  {
    return this.http.put(`${baseUrl}/authors`,author);
  }
}
