import { Component, OnInit } from '@angular/core';
import { User } from 'src/entities/user';
import { UserServerService } from 'src/services/user-server.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  private selectedUser: User;
  private users: User[] = [
    new User("Peter", "peter@peter.sk",1),
    new User("Lucia", "lucia@peter.sk"),
    new User("Jano", "janko456@gmail.com", 3, new Date(), "qwerty")];
  private users$:Observable<User[]>;

  constructor(private userServerService: UserServerService) { }

  ngOnInit() {
    // this.userServerService.getUsers().subscribe(
    //   users => this.users = users
    // );
    this.users$ = this.userServerService.getUsers();
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }
}
