import { Component, OnInit } from '@angular/core';
import { UserServerService } from 'src/services/user-server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  username: string = null;
  constructor(
    private router: Router,
    private userServerService: UserServerService) { }

  ngOnInit() {
    this.username = this.userServerService.username;
    this.userServerService.username$
    .subscribe(
      username => this.username = username
    );
  }

  logout() {
    this.userServerService.logout().subscribe();
  }
}
