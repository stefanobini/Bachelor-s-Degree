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

  // activities/user/{user}/kcalToday -> int
  caloriesBurnedToday(username: string) {
    return this.http.get<number>(this.env.API_URL + 'activities/user/' + username + "/kcalToday", 
    {headers: new HttpHeaders({'Accept': 'application/json'})})
    .pipe(kcal => {
        return kcal;
      }
    )
  }

  // activities/user/{user}/kcalBurned7Days -> integer[]
  caloriesBurnedLast7Day(username: string) {
    return this.http.get<number[]>(this.env.API_URL + 'activities/user/' + username + "/kcalBurned7Days", 
    {headers: new HttpHeaders({'Accept': 'application/json'})})
    .pipe(kcal => {
        return kcal;
      }
    )
  }

  // activities/user/{user}/kcalBurned7Days/{activity} -> integer[]
  caloriesBurnedLast7DayActivity(username: string, activity: string) {
    return this.http.get<number[]>(this.env.API_URL + 'activities/user/' + username + "/kcalBurned7Days/" + activity, 
    {headers: new HttpHeaders({'Accept': 'application/json'})})
    .pipe(kcal => {
        return kcal;
      }
    )
  }

  // activities/user/{user}/avgHrToday -> int
  heartRateAverageToday(username: string) {
    return this.http.get<number>(this.env.API_URL + 'activities/user/' + username + "/avgHrToday", 
    {headers: new HttpHeaders({'Accept': 'application/json'})})
    .pipe(hr => {
        return hr;
      }
    )
  }

  // activities/user/{user}/avgHr7Days/{activity} -> integer[]
  heartRateAvarageLast7DayActivity(username: string, activity: string) {
    return this.http.get<number[]>(this.env.API_URL + 'activities/user/' + username + "/avgHr7Days/" + activity, 
    {headers: new HttpHeaders({'Accept': 'application/json'})})
    .pipe(hr => {
        return hr;
      }
    )
  }

}
