import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/helper.service';
import { SelectContactPage } from '../select-contact/select-contact.page';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { MessagesService } from '../messages.service';
import { AuthService } from 'src/app/auth/auth.service';
import { FirebaseService } from 'src/app/firebase.service';
import * as firebase from 'firebase';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private helper: HelperService,
    private messageService: MessagesService,
    private auth: AuthService,
    private firebaseService: FirebaseService,
  ) { }

  recipients;
  text;
  messageId;
  messagesRef = "/users/" + this.firebaseService.user.uid + "/messagesGroup/";
  ngOnInit() {
  }
  ionViewWillEnter() {
    this.recipients = this.messageService.recipients;
    this.getMessageId();
  }
  ionViewWillLeave() {
    this.recipients = this.messageService.recipients = [];
  }
  close() {
    this.helper.closeModal();
  }
  viewContacts() {
    this.helper.openModalPromise(SelectContactPage, null).then(() => {
      this.getMessageId()
    })
  }
  removeUser(user) {
    this.messageService.removeUserAsRecipient(user);
    this.getMessageId();
  }

  checkIfMultipleRecipients(recipients) {
    if (recipients.length > 1) {
      return recipients[0].name + " & " + (recipients.length - 1) + " more"
    } else {
      return recipients[0].name
    }
  }

  sendMessage() {
    let message = {
      text: this.text,
      created: new Date(),
      new: true,
    }
    this.firebaseService.setDocument(this.messagesRef + this.messageId, {
      recipients: [...this.getRecipientsUids()],
      modified: new Date(),
    }).then(() => {
      this.firebaseService.addDocument(this.messagesRef + this.messageId + "/messages", message)
    })
    this.text = "";
  }

  getRecipientsUids() {
    let recipients = []
    this.recipients.forEach((recipient) => {
      recipients.push(recipient.uid)
    })
    return recipients;
  }

  getMessageId() {
    firebase.firestore().collection(this.messagesRef).get().then((MessageGroupSnapshot) => {
      if (!MessageGroupSnapshot.docs.length) {
        this.messageId = firebase.firestore().collection(this.messagesRef).doc().id;
        console.log(this.messageId);

      }



      MessageGroupSnapshot.forEach((MessageGroup) => {
        let recipients: [] = MessageGroup.data().recipients;
        let sameArray = (recipients.sort().toString() == this.getRecipientsUids().sort().toString());
        console.log(sameArray);
        if (sameArray) {
          this.messageId = MessageGroup.id;
          console.log(this.messageId);

        } else {
          this.messageId = firebase.firestore().collection(this.messagesRef).doc().id;
          console.log(this.messageId);
        }
      })
    })
  }
}
