import { Component, Input } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather-tile',
  templateUrl: './weather-tile.component.html',
  styleUrl: './weather-tile.component.scss'
})
export class WeatherTileComponent {

  @Input() cityWeather: any;

  constructor(private weatherService: WeatherService) { }
  
  
  openWeatherMapUrl() {
    this.weatherService.getCityId(this.cityWeather.city).subscribe(response => {
      const cityId = response.id;
      const url = `https://openweathermap.org/city/${cityId}`;
      window.open(url, '_blank');
    });
  }

  backgroundTile(icon: string) {
    if (icon.includes('01')) {
      return 'clear-sky'
    } else if (icon.includes('02')) {
      return 'few-clouds'
    } else if (icon.includes('03')) {
      return 'scattered-clouds'
    } else if (icon.includes('04')) {
      return 'broken-clouds'
    } else if (icon.includes('09')) {
      return 'shower-rain'
    } else if (icon.includes('10')) {
      return 'rain'
    } else if (icon.includes('11')) {
      return 'thunderstorm'
    } else if (icon.includes('02')) {
      return 'snow'
    } else if (icon.includes('02')) {
      return 'mist'
    } else return

  }

}