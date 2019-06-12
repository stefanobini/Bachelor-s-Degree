import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../models/user.model';
import { Storage } from '@ionic/storage';
import { UserService } from '../services/user.service';

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
  user: User = new User("username", "email", "password", "name", "surname", 75, 24, "M", 1.75, 0);
  heartRate: number = 0;
  day: number = 0;
  remaining: number = 0;

  constructor(private geolocation: Geolocation,
    private authService: AuthService,
    private userService: UserService,
    private storage: Storage) {}

  ngOnInit() {
    this.loadMap();
  }

  ionViewWillEnter() {
    this.storage.get('user').then( user => {
      console.log("success get storage: "+user.username);
      this.user = user;
      this.drawStateCharts();
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
    var dataPieChart: number;
    this.userService.caloriesBurnedToday(this.user.username).subscribe( data => {
      console.log("kcal today = " + data);
      dataPieChart = data;
      this.remaining = ((this.user.kcalGoal-dataPieChart) < 0) ? 0 : this.user.kcalGoal-dataPieChart;
      this.caloriesBurnedChartData = {
        chartType: 'PieChart',
        dataTable: [
          ['Languages', 'Percent'],
          ['Burned',    dataPieChart],
          ['Remaining', this.remaining]
        ],
        options: {
          'pieHole': 0.55,
          'legend': 'none',
          'title': '',
          'width': 100,
          'height': 100,
          colors: ['#d33939', '#86888f'],
          pieSliceTextStyle: {color: '#f4f5f8', fontSize: 3},
          pieSliceBorderColor: '#383a3e'
        }
      };
    });
    var dataLineChart: number[];
    this.userService.caloriesBurnedLast7Day(this.user.username).subscribe( data => {
      console.log("total kcal last 7 day = " + data);
      dataLineChart = data;
      this.day = 0;
      while((this.day < 7) && (dataLineChart[this.day] == 0)){
        this.day++;
      }
      this.activitiesChartData = {
        chartType: 'LineChart',
        dataTable: [
          ['Week day', 'Calories'],
          ['15 Gen', dataLineChart[6]],
          ['16 Gen', dataLineChart[5]],
          ['17 Gen', dataLineChart[4]],
          ['18 Gen', dataLineChart[3]],
          ['19 Gen', dataLineChart[2]],
          ['20 Gen', dataLineChart[1]],
          ['21 Gen', dataLineChart[0]]
        ],
        options: {
          'legend': 'none',
          'title': '',
          color: '',
          chartArea:{left: '12%', width:'80%'}
        }
      }
    });
    this.heartRate = 0;
    this.userService.heartRateAverageToday(this.user.username).subscribe( data => {
      console.log("heart rate today = " + data);
      this.heartRate = data;
    })
  }

  drawWalkingCharts() {
    var dataKcalWalkingChart: number[];
    this.userService.caloriesBurnedLast7DayActivity(this.user.username, 'Camminata').subscribe( data => {
      console.log("kcal walking last 7 day = " + data);
      dataKcalWalkingChart = data;
      this.caloriesBurnedWalkingChart = {
        chartType: 'LineChart',
        dataTable: [
          ['Week day', 'Calories'],
          ['15 Gen', dataKcalWalkingChart[6]],
          ['16 Gen', dataKcalWalkingChart[5]],
          ['17 Gen', dataKcalWalkingChart[4]],
          ['18 Gen', dataKcalWalkingChart[3]],
          ['19 Gen', dataKcalWalkingChart[2]],
          ['20 Gen', dataKcalWalkingChart[1]],
          ['21 Gen', dataKcalWalkingChart[0]]
        ],
        options: {
          'legend': 'none',
          'title': '',
          color: '',
          chartArea:{left: '12%', width:'80%'}
        }
      }
    });
    var dataHRWalkingChart: number[];
    this.userService.heartRateAvarageLast7DayActivity(this.user.username, 'Camminata').subscribe( data => {
      console.log("HR walking last 7 day = " + data);
      dataHRWalkingChart = data;
      this.heartRateWalkingChart = {
        chartType: 'LineChart',
        dataTable: [
          ['Week day', 'Heart rate'],
          ['15 Gen', dataHRWalkingChart[6]],
          ['16 Gen', dataHRWalkingChart[5]],
          ['17 Gen', dataHRWalkingChart[4]],
          ['18 Gen', dataHRWalkingChart[3]],
          ['19 Gen', dataHRWalkingChart[2]],
          ['20 Gen', dataHRWalkingChart[1]],
          ['21 Gen', dataHRWalkingChart[0]]
        ],
        options: {
          'legend': 'none',
          'title': '',
          color: '',
          chartArea:{left: '12%', width:'80%'}
        }
      }
    });
  }

  drawPushUpCharts() {
    var dataKcalPushupChart: number[];
    this.userService.caloriesBurnedLast7DayActivity(this.user.username, 'Piegamenti').subscribe( data => {
      console.log("kcal pushup last 7 day = " + data);
      dataKcalPushupChart = data;
      this.caloriesBurnedPushUpChart = {
        chartType: 'LineChart',
        dataTable: [
          ['Week day', 'Calories'],
          ['15 Gen', dataKcalPushupChart[6]],
          ['16 Gen', dataKcalPushupChart[5]],
          ['17 Gen', dataKcalPushupChart[4]],
          ['18 Gen', dataKcalPushupChart[3]],
          ['19 Gen', dataKcalPushupChart[2]],
          ['20 Gen', dataKcalPushupChart[1]],
          ['21 Gen', dataKcalPushupChart[0]]
        ],
        options: {
          'legend': 'none',
          'title': '',
          color: '',
          chartArea:{left: '12%', width:'80%'}
        }
      }
    });
    var dataHRPushupChart: number[];
    this.userService.heartRateAvarageLast7DayActivity(this.user.username, 'Piegamenti').subscribe( data => {
      console.log("HR pushup last 7 day = " + data);
      dataHRPushupChart = data;
      this.heartRatePushUpChart = {
        chartType: 'LineChart',
        dataTable: [
          ['Week day', 'Heart rate'],
          ['15 Gen', dataHRPushupChart[6]],
          ['16 Gen', dataHRPushupChart[5]],
          ['17 Gen', dataHRPushupChart[4]],
          ['18 Gen', dataHRPushupChart[3]],
          ['19 Gen', dataHRPushupChart[2]],
          ['20 Gen', dataHRPushupChart[1]],
          ['21 Gen', dataHRPushupChart[0]]
        ],
        options: {
          'legend': 'none',
          'title': '',
          color: '',
          chartArea:{left: '12%', width:'80%'}
        }
      }
    });
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
