import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  //API_URL = 'http://172.19.12.5:8080/';
  //API_URL = 'http://172.20.10.14:8080/';
  API_URL = 'http://172.19.4.114:8080/ProjectServer/';
  //API_URL = 'http://192.168.43.33:8080/ProjectServer/';

  constructor() { }
}
