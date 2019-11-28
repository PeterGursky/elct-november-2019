import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../entities/user';
import { Observable, of, EMPTY } from 'rxjs';
import { catchError, map, defaultIfEmpty } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MessageService } from './message.service';
import { Auth } from 'src/entities/auth';
import { Group } from 'src/entities/group';

@Injectable({
  providedIn: 'root'
})
export class UserServerService {
  public username$ = new EventEmitter<string>();
  private url = 'http://192.168.1.62:8080/';
  private users: User[] = [
    new User("PeterService", "peter@peter.sk",10),
    new User("LuciaService", "lucia@peter.sk")];


  constructor(
    private http: HttpClient, 
    private messageService: MessageService
  ) { }

  get token():string {
    return localStorage.getItem('token');
  }

  set token(token:string) {
    if (token === null) {
      localStorage.removeItem('token');
    } else {
      localStorage.setItem('token',token);
    }
  }

  get username():string {
    return localStorage.getItem('username');
  }

  set username(username:string) {
    if (!username) {
      localStorage.removeItem('username');
    } else {
      localStorage.setItem('username', username);
    }
  }

  getLocalUsers():Observable<User[]> {
    return of(this.users);
  }

  getUsers():Observable<User[]> {
    return this.http.get<User[]>(this.url + 'users')
      .pipe(catchError(error => this.processHttpError(error)));
  }

  getExtendedUsers():Observable<User[]> {
    return this.http.get<User[]>(this.url + 'users/'
      + this.token)
      .pipe(catchError(error => this.processHttpError(error)));
  }

  saveUser(user:User):Observable<User> {
    return this.http.post<User>(this.url + 'users/'
      + this.token, user)
      .pipe(catchError(error => this.processHttpError(error)));
  }

  getGroups():Observable<Group[]> {
    return this.http.get<Group[]>(this.url + 'groups')
      .pipe(catchError(error => this.processHttpError(error)));
  }
  
  login(auth: Auth):Observable<boolean> {
    return this.http.post(this.url + 'login', auth, {responseType: "text"})
    .pipe(
      map( token => {
       this.token = token;
       this.username = auth.name;
       this.username$.emit(this.username);
       return true;
      }),
      catchError(error => this.processHttpError(error)),
      defaultIfEmpty(false));
  }

  logout():Observable<void> {
    this.username = null;
    this.token = null;
    this.username$.emit(null);
    return of(undefined);
  }

  private processHttpError(error: any):Observable<any> {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        this.messageService.sendMessage("Server is down!!!");
      }
      if (error.status === 401) {
        this.logout();
        this.messageService.sendMessage("Unauthorized !!!");
      }
    }
    return EMPTY;
  }

}
