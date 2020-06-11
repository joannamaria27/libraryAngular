import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Book } from "../Model/Book";
import { LibraryUser } from "../Model/LibraryUser";
import { Author } from "../Model/Author";
import { Authorization } from "../Model/Authorization";
import { HttpHeaders } from "@angular/common/http";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var clonedRequest = req.clone({
      headers: req.headers.set(
        "Authorization",
        "Bearer " + localStorage.getItem("jwt"),
      ),
      withCredentials: true
    });
    console.log("Request with JWT" + " " + JSON.stringify(clonedRequest));
    if (localStorage.getItem("jwt") != null) return next.handle(clonedRequest);
    else return next.handle(req);
  }
}

const baseUrl = "https://whispering-springs-71622.herokuapp.com/api";

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
    "Access-Control-Allow-Headers": "Cache-Control, Authorization, Content-Type",
    
    
    //"Access-Control-Allow-Origin": "*",
    //"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    //'Origin':'http://localhost:4200',
    //'Access-Control-Request-Headers':' Accept, X-Requested-With',
    //'Access-Control-Allow-Credentials': 'true',
    //'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Headers'
  }),
};

@Injectable({
  providedIn: "root",
})
export class ConnectionService {
  constructor(private http: HttpClient) {}

  //Header
  addHeader(jwt) {
    localStorage.setItem("jwt", jwt);
  }
  getHeaders() {
    return httpOptions.headers;
  }
  removeHeader() {
    localStorage.removeItem("jwt");
  }

  //BOOKS
  getAllBooks() {
    return this.http.get<Book[]>(`${baseUrl}/books`, httpOptions);
  }
  getAllBooksByTitle(title) {
    return this.http.get<Book[]>(
      `${baseUrl}/books/title=${title}`,
      httpOptions
    );
  }
  getAllBooksByReleaseYear(year) {
    return this.http.get<Book[]>(`${baseUrl}/books/year=${year}`, httpOptions);
  }
  getAllBooksByAuthorName(name) {
    return this.http.get<Book[]>(
      `${baseUrl}/books/author=${name}`,
      httpOptions
    );
  }
  getBookById(id) {
    return this.http.get<Book>(`${baseUrl}/books/${id}`, httpOptions);
  }
  deleteBookById(id) {
    return this.http.delete(`${baseUrl}/books/${id}`, httpOptions);
  }
  addBook(book) {
    return this.http.post<Book>(`${baseUrl}/books`, book, httpOptions);
  }
  updateBook(book) {
    return this.http.put(`${baseUrl}/books`, book, httpOptions);
  }
  //USERS
  getAllUsers() {
    return this.http.get<LibraryUser[]>(`${baseUrl}/admin/users`, httpOptions);
  }
  findUserByName(name) {
    return this.http.get<LibraryUser>(
      `${baseUrl}/admin/users/name=${name}`,
      httpOptions
    );
  }
  getUserById(id) {
    return this.http.get<LibraryUser>(
      `${baseUrl}/admin/users/${id}`,
      httpOptions
    );
  }
  deleteUserById(id) {
    return this.http.delete(`${baseUrl}/admin/users/${id}`, httpOptions);
  }
  addUser(user) {
    return this.http.post<LibraryUser>(
      `${baseUrl}/admin/users`,
      user,
      httpOptions
    );
  }
  updateUser(user) {
    return this.http.put(`${baseUrl}/admin/users`, user, httpOptions);
  }
  //AUTHORS
  getAllAuthors() {
    return this.http.get<Author[]>(`${baseUrl}/authors`, httpOptions);
  }
  getAllAuthorsByName(name) {
    return this.http.get<Author[]>(
      `${baseUrl}/authors/name=${name}`,
      httpOptions
    );
  }
  getAuthorById(id) {
    return this.http.get<Author>(`${baseUrl}/authors/${id}`, httpOptions);
  }
  deleteAuthorById(id) {
    return this.http.delete(`${baseUrl}/authors/${id}`, httpOptions);
  }
  addAuthor(author) {
    return this.http.post<Author>(`${baseUrl}/authors`, author, httpOptions);
  }
  updateAuthor(author) {
    return this.http.put(`${baseUrl}/authors`, author, httpOptions);
  }

  signUp(user) {
    return this.http.post<LibraryUser>(
      `${baseUrl}/user/sign-up`,
      user,
      httpOptions
    );
  }

  login(user) {
    return this.http.post<Authorization>(
      `${baseUrl}/user/authenticate`,
      user,
      httpOptions
    );
  }

  borrow(id, username) {
    return this.http.post<String>(
      `${baseUrl}/user/borrow/${id}`,
      username, 
      httpOptions
    );
  }
  return(id) {
    return this.http.post<String>(
      `${baseUrl}/user/return/${id}`,
      httpOptions
    );
  }
  getLoggedUser(id) {
    return this.http.get<LibraryUser>(
      `${baseUrl}/user/${id}`,
      httpOptions
    );
  }
}
