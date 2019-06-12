import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from './env.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  //token:any;

  constructor(private http: HttpClient, /*private storage: Storage,*/ private env: EnvService) { }

  login(username: String, password: String) {
    /*return this.http.post(this.env.API_URL + 'auth/login',
      {email: email, password: password}
    ).pipe(
      tap(token => {
        this.storage.setItem('token', token)
        .then(
          () => {
            console.log('Token Stored');
          },
          error => console.error('Error storing item', error)
        );
        this.token = token;
        this.isLoggedIn = true;
        return token;
      }),
    );*/
    return this.http.get<User>(this.env.API_URL + 'users/login/' + username + '/' + password, 
    {headers: new HttpHeaders({'Accept': 'application/json'})}).
    pipe(user => {
      return user;
    })
  }

  signup(user: User) {
    return this.http.post(this.env.API_URL + 'auth/signup', user)
  }

  /*user() {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this.http.get<User>(this.env.API_URL + 'auth/user', { headers: headers })
    .pipe(
      tap(user => {
        return user;
      })
    )
  }*/

  user(username: string) {
    return this.http.get<User>(this.env.API_URL + 'users/' + username, 
      {headers: new HttpHeaders({'Accept': 'application/json'})})
      .pipe(user => {
          return user;
        }
      )
  }

}
