import { Injectable } from '@angular/core';
import { Activity } from './activity.model';

 @Injectable({providedIn: 'root'})
export class User{
    
    //long serialVersionUID = 1L;
    username: string;
    email: string;
    password: string;
    name: string;
    surname: string;
    weight: number;
    age: number;
    gender: string;
    height: number;
    kcalGoal: number;
    activitiesCollection: Activity[];

    constructor(username, email, password, name, surname, weight, age, gender, height, kcalGoal){
        this.username = username;
        this.email = email;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.weight = weight;
        this.age = age;
        this.gender = gender;
        this.height = height;
        this.kcalGoal = kcalGoal;
    }

}
