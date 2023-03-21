import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { ICurrrentWeatherData } from './icurrrent-weather-data';
import { ICurrentWeather } from './icurrent-weather';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  // cb5c4aab740d7c5876e1d5c97dcf7fe8


  constructor(private HttpClient: HttpClient) { }

  getCurrentWeather(search:string | number, country?:string) {
    let uriParams = '';
    if(typeof search === 'string') {
      uriParams = `q=${search}`
    } else {
      uriParams = `zip=${search}`
    }

    if (country) {
      uriParams = `${uriParams},${country}`
    }


    return this.HttpClient.get<ICurrrentWeatherData>(`https://api.openweathermap.org/data/2.5/weather?${uriParams}&appid=${environment.appId}`)
    .pipe(map(data => this.transformToIcurrentWeather(data)))
  }

  private transformToIcurrentWeather(data: ICurrrentWeatherData) 
: ICurrentWeather {
  return {
    
    city: data.name,
        country: data.sys.country,
        date: new Date(data.dt *1000),
        temperature: data.main.temp * 9/5 -459.67,
        description: data.weather[0].description,
        image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`

}
}
}






// https://api.openweathermap.org/data/2.5/weather?q=Redmond,US&appid=cb5c4aab740d7c5876e1d5c97dcf7fe8