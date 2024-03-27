import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { Subscription, catchError, interval, takeWhile, throwError } from 'rxjs';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  cities = ['Lodz', 'Warsaw', 'Berlin', 'New York', 'London'];
  weatherData: any[] = [];
  sub!: Subscription;
  randomCities: Array<string> = [];
  private alive = true;
  private refreshIntervalData = 10000;
  private refreshIntervalCities = 60000;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.generateRandomCities();
    this.fetchWeather();

    setInterval(() => {
      console.log('new cities');
      this.generateRandomCities();
    }, this.refreshIntervalCities);

    this.sub = interval(this.refreshIntervalData).pipe(
      takeWhile(() => this.alive)
    ).subscribe(() => {
      this.fetchWeather();
    });
  }

  fetchWeather(): void {
    console.log('refreshed')
    this.weatherData = [];
    for (const city of this.randomCities) {
      this.weatherService.getWeather(city)
        .pipe(
          catchError(error => {
            console.error('Error fetching weather for city:', city, error);
            return throwError(() => new Error('Error fetching weather data'));
          })
        )
        .subscribe((data: any) => {
          this.weatherData.push({
            city: data.name,
            temperature: Math.round(data.main.temp),
            description: data.weather[0].description,
            mainDescription: data.weather[0].main,
            icon: data.weather[0].icon,
          });
        });
    }
  }

  generateRandomCities(): void {
    const availableCities = [...this.cities];
    this.randomCities = [];
    while (this.randomCities.length < 3 && availableCities.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableCities.length);
      this.randomCities.push(availableCities.splice(randomIndex, 1)[0]);
    }
    this.randomCities.sort();
  }

  ngOnDestroy(): void {
    this.alive = false;
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}