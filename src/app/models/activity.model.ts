import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({providedIn: 'root'})
export class Activity{
    //long serialVersionUID = 1L;
    activitiesPK: {username: string, date: string};
    type: string;
    kcalBurned: number;
    percentageCorrect: number;
    avghr: number;
    minhr: number;
    maxhr: number;
    duration: number;
    users: User;

    constructor(username, date, type, kcalBurned, percentageCorrect, avghr, maxhr, minhr) {
        this.activitiesPK = {username, date};
        this.type = type;
        this.kcalBurned = kcalBurned;
        this.percentageCorrect = percentageCorrect;
        this.avghr = avghr;
        this.maxhr = maxhr;
        this.minhr = minhr;
    }
}
