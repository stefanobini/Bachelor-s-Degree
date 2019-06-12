import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { User } from 'src/app/models/user.model';
//import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  username: string;
  email: string;
  password: string;

  constructor(private route: Router, 
    //private modalController: ModalController,
    private authService: AuthService,
    private alertService: AlertService/*,
    private storage: Storage*/) {}

  ngOnInit() {}

  // Dismiss Register Modal
  /*dismissRegister() {
    this.modalController.dismiss();
  }*/

  login() {
    //this.dismissRegister();
    this.route.navigateByUrl('/login');
  }

  /*signup(form: NgForm) {
    this.authService.register(form.value.username, form.value.email, form.value.password).subscribe(
      data => {
        this.authService.login(form.value.email, form.value.password).subscribe(
          data => {
          },
          error => {
            console.log(error);
          },
          () => {
            this.dismissRegister();
            this.route.navigateByUrl('/profile-information');
          }
        );
        this.alertService.presentToast(data['message']);
      },
      error => {
        console.log(error);
      }, () => { }
    );
  }*/

  signup(){
    // fare check su ion-input vuoti
    this.authService.signup(new User(this.username, this.email, this.password, "name", "surname", 75, 25, "M", 1.75, 500))
    .subscribe(
      user => {
        this.alertService.presentToast("Account create");
        //this.storage.set("user", user);
      }
    )
  }

}
