import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor() { }

  recipients = [];


  removeUserAsRecipient(user){
    let index = this.recipients.findIndex(u => user.uid == u.uid);
    this.recipients.splice(index, 1);
  }
}
