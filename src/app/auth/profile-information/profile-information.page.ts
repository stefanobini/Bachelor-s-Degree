import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.page.html',
  styleUrls: ['./profile-information.page.scss'],
})
export class ProfileInformationPage implements OnInit {

  user: User = new User("username", "email", "password", "name", "surname", 75, 24, "M", 1.75, 500);

  constructor(private router: Router, private userService: UserService, private alertService: AlertService) { }

  ngOnInit() { }

  ionViewWillEnter() {
    //this.user = this.storage.get('user');
  }

  signup() {
    this.userService.update(this.user).subscribe(
      user => {
        this.alertService.presentToast("Update profile");
        //this.storage.set('user', user);
        this.router.navigateByUrl('/tabs');
      }
    )
  }

}
