import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/entities/auth';
import { UserServerService } from 'src/services/user-server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private auth = new Auth();

  constructor(
    private router: Router,
    private userServerService: UserServerService) { }

  ngOnInit() {
  }

  get print() {
    return JSON.stringify(this.auth);
  }

  setName(name: string) {
    this.auth.name = name;
  }

  onSubmit() {
    this.userServerService.login(this.auth).subscribe(success => {
      if (success) {
        this.router.navigateByUrl("/users");
      }
    });
  }
}
