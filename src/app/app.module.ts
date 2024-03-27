import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { WeatherComponent } from "./weather/weather.component";
import { HttpClientModule } from "@angular/common/http";
import { WeatherTileComponent } from "./weather/weather-tile/weather-tile.component";
@NgModule({
    declarations: [
      AppComponent,
      WeatherComponent,
      WeatherTileComponent,
    ],
    imports: [
      BrowserModule,
      RouterModule,
      HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule { }