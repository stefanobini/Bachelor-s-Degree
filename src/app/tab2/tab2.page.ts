import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  user: User = new User("username", "email", "password", "name", "surname", 75, 24, "M", 1.75, 500);

  constructor(private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private userService: UserService,
    private storage: Storage) { }

  ionViewWillEnter() {
    this.storage.get('user').then( user => {
      console.log("success get storage: "+user.username);
      this.user = user;
    }, err => {
      console.log('Error durig get storage')
    })
  }

  save() {
    this.userService.update(this.user).subscribe(
      user => {
        this.alertService.presentToast("Update profile");
        this.storage.set('user', user);
      }
    )
  }

  logout() {
    this.storage.remove('user').then( success => {
      this.alertService.presentToast('Logout performed');
      this.router.navigateByUrl('/login');
    })
  }

}
