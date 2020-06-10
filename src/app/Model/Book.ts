import { Author } from './Author';
import { LibraryUser } from './LibraryUser';

export class Book{
    id:number;
    title:string;
    releaseDate:string;
    owner:LibraryUser;
    Authors:Author[];
}