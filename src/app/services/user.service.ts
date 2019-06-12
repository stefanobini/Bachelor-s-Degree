import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { EnvService } from './env.service';

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private http: HttpClient, private env: EnvService) { }

  update(user: User) {
    return this.http.put<User>(this.env.API_URL + 'users/' + user.username, user, 
    {headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*'})})
  }
}
