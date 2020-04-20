import { Book } from './Book';

export class LibraryUser{
    id:number;
    Username:string;
    Email:string;
    RentedBooks:Book[];
}