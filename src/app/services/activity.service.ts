import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http: HttpClient, private env: EnvService) { }

  
}
