import {Component, inject} from '@angular/core';
import {WeatherService} from '../weather.service';
import {ActivatedRoute} from '@angular/router';
import {Forecast} from './forecast.type';

@Component({
    selector: 'app-forecasts-list',
    templateUrl: './forecasts-list.component.html',
    styleUrls: ['./forecasts-list.component.css']
})
export class ForecastsListComponent {
    protected weatherService = inject(WeatherService);
    private activatedRoute = inject(ActivatedRoute);

    zipcode: string;
    forecast: Forecast;

    constructor() {
        this.activatedRoute.params.subscribe(params => {
            this.zipcode = params['zipcode'];
            this.weatherService.getForecast(this.zipcode)
                .subscribe(forecast => this.forecast = forecast);
        });
    }
}
