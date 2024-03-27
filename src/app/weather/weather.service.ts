import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = 'fe20e701b48bd9be36e769e75543f855';
  
  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<any> {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric&lang=pl`;
    return this.http.get(url);
  }

  getCityId(cityName: string) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.apiKey}`;
    return this.http.get<any>(url);
  }
}