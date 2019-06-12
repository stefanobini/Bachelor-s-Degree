import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  message: string;
  private deviceID = "98:D3:31:00:09:35";
  private command: string;
  toggleValue: boolean;
  
  success = (data) => alert(data);
  fail = (error) => alert(error);

  constructor(private bluetoothSerial: BluetoothSerial, private alertCtrl: AlertController) { 
    this.isEnabled();
  }

  checkToggle(){
    if(this.toggleValue){
      this.bluetoothSerial.enable().then(confirm => {
        alert('Bluetooth actived!');
      }, cancel => {
        this.toggleValue = false;
      });
    }
    else{
      if (!this.isEnabled())
        this.disconnect();
    }
  }

  isEnabled() {
    this.bluetoothSerial.isEnabled().then(enabled => {
      this.toggleValue = true;
    }, disabled => {
      this.toggleValue = false;
    });
    return this.toggleValue;
  }

  async connect() {
    const alert = await this.alertCtrl.create({
      header: 'Connect',
      message: 'Do you want to connect with?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.toggleValue = false;
          }
        },
        {
          text: 'Connect',
          handler: () => {
            /*this.bluetoothSerial.connect(this.deviceID).subscribe(data => {
              var bytes = new Uint8Array(data);
              console.log("data: "+data+"/nbytes: "+bytes);
            }, this.fail);*/
            this.bluetoothSerial.connect(this.deviceID).subscribe(
              success => {
                this.bluetoothSerial.subscribe('\n').subscribe(
                  success => {
                    this.message = success;
                    console.log("success");
                  },
                  error => {
                    console.log("error1");
                  }
                );
              },
              error => {
                console.log("error2");
              });
          }
        }
      ]
    });
    return await alert.present();
  }
  
  async turn(command){
      this.bluetoothSerial.write(command).then(this.success, this.fail);;
  }

  async disconnect() {
    const alert = await this.alertCtrl.create({
      header: 'Disconnect?',
      message: 'Do you want to Disconnect?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.toggleValue = true;
          }
        },
        {
          text: 'Disconnect',
          handler: () => {
            this.bluetoothSerial.disconnect();
          }
        }
      ]
    });
    return await alert.present();
  }

}
