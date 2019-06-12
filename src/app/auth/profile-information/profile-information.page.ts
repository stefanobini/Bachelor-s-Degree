import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.page.html',
  styleUrls: ['./profile-information.page.scss'],
})
export class ProfileInformationPage implements OnInit {

  user: User = new User("username", "email", "password", "name", "surname", 75, 24, "M", 1.75, 500);

  constructor(private router: Router,
    private authService: AuthService, 
    private userService: UserService, 
    private alertService: AlertService, 
    private storage: Storage) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.storage.get('user').then( user => {
      console.log("success get storage: "+ user);
      this.user = user;
    }, err => {
      console.log("error get storage: "+ err);
      this.alertService.presentToast('Error during the registration')
    })
  }

  signup() {
    this.userService.update(this.user).subscribe(
      user => {
        this.alertService.presentToast("Update profile, welcome in SmarT-shirt app");
        this.storage.set('user', user);
        this.authService.isLoggedIn = true;
        this.router.navigateByUrl('/tabs');
      }
    )
  }

}
