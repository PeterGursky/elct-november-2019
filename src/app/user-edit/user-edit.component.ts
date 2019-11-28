import { Component, Output, EventEmitter, OnChanges, Input } from '@angular/core';
import { User } from 'src/entities/user';
import { UserServerService } from 'src/services/user-server.service';
import { Group } from 'src/entities/group';

declare var $:any;

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnChanges {
  @Output() onSave = new EventEmitter<User>();
  @Input() user: User;
  groups: Map<Group, boolean> = new Map<Group, boolean>();

  constructor(private userServerService: UserServerService) { }

  ngOnChanges() {
    this.groups.clear();
    this.userServerService.getGroups().subscribe(
      groups => {
        groups.forEach(group => {
          const isThere = this.user.groups.some(g => g.id === group.id);
          this.groups.set(group, isThere);
        });
      }
    );
  }

  get userString() {
    return JSON.stringify(this.user);
  }

  toggleGroup(group:Group, checked:boolean) {
    console.log(group, checked)
    this.groups.set(group, checked);
    if (checked) {
      this.user.groups = [...this.user.groups, group];
    } else {
      this.user.groups = this.user.groups.filter(el => el.id !== group.id);
    }
  }

  onSubmit() {
    this.onSave.emit(this.user);
    $('#userEditModal').modal('hide');
  }
}
