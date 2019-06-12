import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

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
    private userService: UserService) { }

  ionViewWillEnter() {
    this.authService.user('Umberto7').subscribe(
      user => {
        this.user = user;
      }
    );
  }

  /*ionViewWillEnter() {
    user: User = this.storage.get('user')
  }*/

  save() {
    this.userService.update(this.user).subscribe(
      user => {
        this.alertService.presentToast("Update profile");
        //this.user = user;
        //this.storage.set('user', this.user);
      }
    )
  }

  logout() {
    this.router.navigateByUrl('/login');
  }

}
