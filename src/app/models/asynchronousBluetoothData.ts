import { Injectable } from '@angular/core';

// 1: asynchronous packet that contain flex sensor and accelerometer data (0: flex error, 1: sx, 2: dx, 3: temperature error)
@Injectable({providedIn: 'root'})
export class periodicBluetoothData {
    
    error: number;
}