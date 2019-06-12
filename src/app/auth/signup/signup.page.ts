import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { Storage } from '@ionic/storage';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  username: string;
  email: string;
  password: string;

  constructor(private router: Router, 
    //private modalController: ModalController,
    private authService: AuthService,
    private alertService: AlertService,
    private storage: Storage) {}

  ngOnInit() {}

  // Dismiss Register Modal
  /*dismissRegister() {
    this.modalController.dismiss();
  }*/

  login() {
    //this.dismissRegister();
    this.router.navigateByUrl('/login');
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
    this.authService.signup(this.username)
    .subscribe(
      user => {
        if (user != null)
          this.alertService.presentToast("The username or email already exist, try again!");
        else{
          this.alertService.presentToast("Congratulation, account created successfully!");
          user = new User(this.username, this.email, this.password, "name", "surname", 75, 24, "M", 1.75, 500);
          this.storage.set("user", user);
          this.router.navigateByUrl('/profile-information');
        }
      }
    )
  }

}
