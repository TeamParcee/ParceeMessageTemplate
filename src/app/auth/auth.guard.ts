import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import { promise } from 'protractor';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private navCtrl: NavController,
    private authService: AuthService
  ) {

  }
  async canActivate() {
    if (await this.checkLoggedIn()) {
      if (this.checkEmailVerified()) {
        return true;
      } else {
        this.navCtrl.navigateRoot("/confirm-email");
        return false;
      }
    }
  }


  checkLoggedIn() {

    return new Promise((resolve) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          return resolve(true)
        } else {
          this.navCtrl.navigateRoot('/auth');
          return resolve(false)
        }
      })

    })

  }

  checkEmailVerified() {
    return this.authService.checkEmailVerified();
  }
}
