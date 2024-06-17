import {Component} from '@angular/core';
import {WeatherService} from '../weather.service';
import {ActivatedRoute} from '@angular/router';
import {Forecast} from './forecast.type';

@Component({
    selector: 'app-forecasts-list',
    templateUrl: './forecasts-list.component.html',
    styleUrls: ['./forecasts-list.component.css']
})
export class ForecastsListComponent {

    zipcode: string;
    forecast: Forecast;

    constructor(protected weatherService: WeatherService, activatedRoute: ActivatedRoute) {
        activatedRoute.params.subscribe(params => {
            this.zipcode = params['zipcode'];
            weatherService.getForecast(this.zipcode)
                .subscribe(forecast => this.forecast = forecast);
        });
    }
}
