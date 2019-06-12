import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { HttpClientModule } from '@angular/common/http';
//import { Storage } from '@ionic/storage';
//import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule/*, IonicStorageModule.forRoot()*/ ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    BluetoothSerial,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
