import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/helper.service';
import { SelectContactPage } from '../select-contact/select-contact.page';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {

  constructor(
    private helper: HelperService,
    private messageService: MessagesService,
  ) { }

  recipients;

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.recipients = this.messageService.recipients;
  }
  ionViewWillLeave(){
    this.recipients = this.messageService.recipients = [];
  }
  close() {
    this.helper.closeModal();
  }
  viewContacts(){
    this.helper.openModal(SelectContactPage, null)
  }
  removeUser(user){
    this.messageService.removeUserAsRecipient(user);
  }

  checkIfMultipleRecipients(recipients){
    if (recipients.length > 1) {
      return recipients[0].name + " & " + (recipients.length - 1) + " more"
    } else {
      return recipients[0].name
    }
  }
}
