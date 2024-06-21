import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

export const LOCATIONS: string = 'locations';

@Injectable()
export class LocationService {

    locations: string[] = [];
    locationAddedSubject = new Subject<string>();
    locationRemovedSubject = new Subject<string>();

    constructor() {
        let locationsString = localStorage.getItem(LOCATIONS);
        if (locationsString) {
            this.locations = JSON.parse(locationsString);
        }
    }

    addLocation(zipcode: string) {
        this.locations.push(zipcode);
        localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
        this.locationAddedSubject.next(zipcode);
    }

    removeLocation(zipcode: string) {
        let index = this.locations.indexOf(zipcode);
        if (index !== -1) {
            this.locations.splice(index, 1);
            localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
            this.locationRemovedSubject.next(zipcode);
        }
    }
}
