import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/helper.service';
import { MessagePage } from './message/message.page';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  constructor(
    private helper: HelperService
  ) { }

  recipients; 

  ngOnInit() {
  }


  createMessage(){
    this.helper.openModal(MessagePage, {recipients: null})
  }

  viewMessages(){
    this.helper.openModal(MessagePage, {recipients: null});
  }
}
