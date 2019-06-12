import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { Storage } from '@ionic/storage';
import { User } from 'src/app/models/user.model';
//import { Users } from "app/classes/users";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // only to test
  username: string;
  password: string;

  constructor(private route: Router, 
    private modalController: ModalController, 
    private authService: AuthService, 
    private alertService: AlertService,
    private storage: Storage) { }

  ngOnInit() {}

  // Dismiss Login Modal
  /*dismissLogin() {
    this.modalController.dismiss();
  }*/

  signup() {
    //this.dismissLogin();
    this.route.navigateByUrl('/signup');
  }

  /*login(form: NgForm) {
    this.authService.login(form.value.email, form.value.password).subscribe(
      data => {
        this.alertService.presentToast("Logged In");
      },
      error => {
        console.log(error);
      },
      () => {
        this.dismissLogin();
        this.route.navigateByUrl('/tabs');
      }
    );   
  }*/

  login (){
    var message;
    this.authService.login(this.username, this.password).subscribe(user => {
      if (user != null){
        this.alertService.presentToast('Welcome');
        this.storage.set('user', user);
        this.authService.isLoggedIn = true;
        this.route.navigateByUrl('/tabs');
      } else 
      this.alertService.presentToast('Username or password is wrong!');
    }), error => {
      this.alertService.presentToast('Error');
    }
  }

}
