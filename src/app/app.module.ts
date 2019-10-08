import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import * as firebase from 'firebase';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MessagePage } from './messages/message/message.page';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { SelectContactPage } from './messages/select-contact/select-contact.page';


var firebaseConfig = {
  apiKey: "AIzaSyDv3R5uSwTxfnnTLN1QVbSg_hyBfstDof0",
  authDomain: "parceetemplate.firebaseapp.com",
  databaseURL: "https://parceetemplate.firebaseio.com",
  projectId: "parceetemplate",
  storageBucket: "parceetemplate.appspot.com",
  messagingSenderId: "804961336499",
  appId: "1:804961336499:web:9137189dd5b1d8974b84c6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


@NgModule({
  declarations: [
    AppComponent,
    MessagePage,
    SelectContactPage,
  ],
  entryComponents: [
  MessagePage,
  SelectContactPage,
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    IonicModule.forRoot(), 
    AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
   
    FormBuilder,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
