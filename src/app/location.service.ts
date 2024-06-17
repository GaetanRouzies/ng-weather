import {Injectable} from '@angular/core';
import {WeatherService} from './weather.service';

export const LOCATIONS: string = 'locations';

@Injectable()
export class LocationService {

    locations: string[] = [];

    constructor(private weatherService: WeatherService) {
        let locationsString = localStorage.getItem(LOCATIONS);
        if (locationsString) {
            this.locations = JSON.parse(locationsString);
        }
        for (let location of this.locations) {
            this.weatherService.addCurrentConditions(location);
        }
    }

    addLocation(zipcode: string) {
        this.locations.push(zipcode);
        localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
        this.weatherService.addCurrentConditions(zipcode);
    }

    removeLocation(zipcode: string) {
        let index = this.locations.indexOf(zipcode);
        if (index !== -1) {
            this.locations.splice(index, 1);
            localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
            this.weatherService.removeCurrentConditions(zipcode);
        }
    }
}
