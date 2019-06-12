import { Injectable } from '@angular/core';

// Type 0: periodical packet that contain temperature and heart rate, the packet is received every 5s
@Injectable({providedIn: 'root'})
export class periodicBluetoothData {
    
    temperature: number;
    heartRate: number;
}