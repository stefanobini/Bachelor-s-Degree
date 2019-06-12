import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../models/user.model';
import { Storage } from '@ionic/storage';

declare var google;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  mapRef = null;
  caloriesBurnedChartData;
  activitiesChartData;
  caloriesBurnedWalkingChart;
  heartRateWalkingChart;
  caloriesBurnedPushUpChart;
  heartRatePushUpChart;
  slide;
  user: User = new User("username", "email", "password", "name", "surname", 75, 24, "M", 1.75, 500);

  constructor(private geolocation: Geolocation,
    private authService: AuthService,
    private storage: Storage) {}

  ngOnInit() {
    this.drawStateCharts();
    //this.loadMap();
  }

  ionViewWillEnter() {
    this.storage.get('user').then( user => {
      console.log("success get storage: "+user.username);
      this.user = user;
    }, err => {
      console.log('Error durig get storage')
    })
  }

  // ************* CHARTS *****************
  async loadCharts(slide){
    this.slide = await slide;
    switch (this.slide){
      case 0:
        this.drawStateCharts();
        break;
      case 1:
        this.drawWalkingCharts();
        break;
      case 2:
        this.drawPushUpCharts();
        break;
      default:
        this.drawStateCharts();
        this.drawWalkingCharts();
        this.drawPushUpCharts();
    }
  }
  
  drawStateCharts() {
    this.caloriesBurnedChartData = {
      chartType: 'PieChart',
      dataTable: [
        ['Languages', 'Percent'],
        ['Burned',     750],
        ['Remaining',      250]
      ],
      options: {
        'pieHole': 0.65,
        'legend': 'none',
        'title': '',
        'width': 100,
        'height': 100,
        colors: ['#d33939', '#86888f'],
        pieSliceTextStyle: {color: '#f4f5f8', fontSize: 3},
        pieSliceBorderColor: '#383a3e'
      }
    };
    this.activitiesChartData = {
      chartType: 'LineChart',
      dataTable: [
        ['Week day', 'Calories'],
        ['15 Gen', 50],
        ['16 Gen', 150],
        ['17 Gen', 700],
        ['18 Gen', 500],
        ['19 Gen', 900],
        ['20 Gen', 300],
        ['21 Gen', 100]
      ],
      options: {
        'legend': 'none',
        'title': '',
        color: '',
        chartArea:{left: '12%', width:'80%'}
      }
    }
  }

  drawWalkingCharts() {
    this.caloriesBurnedWalkingChart = {
      chartType: 'LineChart',
      dataTable: [
        ['Week day', 'Calories'],
        ['15 Gen', 50],
        ['16 Gen', 150],
        ['17 Gen', 700],
        ['18 Gen', 500],
        ['19 Gen', 900],
        ['20 Gen', 300],
        ['21 Gen', 100]
      ],
      options: {
        'legend': 'none',
        'title': '',
        color: '',
        chartArea:{left: '12%', width:'80%'}
      }
    }
    this.heartRateWalkingChart = {
      chartType: 'LineChart',
      dataTable: [
        ['Week day', 'Heart rate'],
        ['15 Gen', 50],
        ['16 Gen', 80],
        ['17 Gen', 72],
        ['18 Gen', 102],
        ['19 Gen', 64],
        ['20 Gen', 91],
        ['21 Gen', 118]
      ],
      options: {
        'legend': 'none',
        'title': '',
        color: '',
        chartArea:{left: '12%', width:'80%'}
      }
    }
  }

  drawPushUpCharts() {
    this.caloriesBurnedPushUpChart = {
      chartType: 'LineChart',
      dataTable: [
        ['Week day', 'Calories'],
        ['15 Gen', 50],
        ['16 Gen', 150],
        ['17 Gen', 700],
        ['18 Gen', 500],
        ['19 Gen', 900],
        ['20 Gen', 300],
        ['21 Gen', 100]
      ],
      options: {
        'legend': 'none',
        'title': '',
        color: '',
        chartArea:{left: '12%', width:'80%'}
      }
    }
    this.heartRatePushUpChart = {
      chartType: 'LineChart',
      dataTable: [
        ['Week day', 'Heart rate'],
        ['15 Gen', 50],
        ['16 Gen', 80],
        ['17 Gen', 72],
        ['18 Gen', 102],
        ['19 Gen', 64],
        ['20 Gen', 91],
        ['21 Gen', 118]
      ],
      options: {
        'legend': 'none',
        'title': '',
        color: '',
        chartArea:{left: '12%', width:'80%'}
      }
    }
  }


  // *************** MAPS *****************

  async loadMap() {
    /*const loading = await this.loadingCtrl.create();
    loading.present();*/
    // Obtain the position
    const myLatLng = await this.getLocation();
    // Load the map
    const mapEle: HTMLElement = document.getElementById('map');
    this.mapRef = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
    /*google.maps.event.addListnerOnce(this.mapRef, 'idle', () => {
      loading.dismiss();
      this.addMarker(myLatLng.lat, myLatLng.lng);
    });*/
  }

  /*private addMarker(lat: number, lng: number) {
    const marker = new google.maps.Marker()({
      position: {lat, lng},
      map: this.mapRef,
      title: 'I am here!'
    });
  }*/

  private async getLocation() {
    const rta = await this.geolocation.getCurrentPosition();
    return { 
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
    };
  }

}
