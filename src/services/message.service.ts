import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private message$ = new Subject<string>();
  constructor() { }

  getSubject(): Subject<string> {
    return this.message$;
  }

  sendMessage(message: string) {
    this.message$.next(message);
  }
}
