import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  private message = '';

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.getSubject().subscribe(
      m => {
        this.message = m;
        setTimeout(() => {
          this.message = '';
        }, 5000);
      }
    );
  }

}
