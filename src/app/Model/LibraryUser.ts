import { Book } from './Book';

export class LibraryUser {
    id: number;
    username: string;
    email: string;
    RentedBooks: Book[];
    admin: boolean;
    password: string;
}