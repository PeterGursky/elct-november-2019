import { Component, OnInit } from '@angular/core';
import { User } from 'src/entities/user';
import { UserServerService } from 'src/services/user-server.service';

declare var $:any;

@Component({
  selector: 'app-extended-users',
  templateUrl: './extended-users.component.html',
  styleUrls: ['./extended-users.component.css']
})
export class ExtendedUsersComponent implements OnInit {

  users: User[];
  editedUser: User = new User("","");
  
  constructor(private userServerService: UserServerService) { }

  ngOnInit() {
    this.userServerService.getExtendedUsers()
      .subscribe(users => this.users = users);
  }

  saveUser(user:User) {
    this.userServerService.saveUser(user)
     .subscribe(u => this.users.push(u));
  }

  onAddUser() {
    this.editedUser = new User("","");
  }

  editUser(user:User) {
    this.editedUser = {...user};
    $('#userEditModal').modal('show');
  }
}
