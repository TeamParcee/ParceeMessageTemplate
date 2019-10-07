import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/helper.service';
import { SelectContactPage } from '../select-contact/select-contact.page';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {

  constructor(
    private helper: HelperService,
  ) { }

  ngOnInit() {
  }
  close() {
    this.helper.closeModal();
  }
  viewContacts(){
    this.helper.openModal(SelectContactPage, null)
  }
}
