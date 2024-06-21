import {Component, effect, inject, Signal} from '@angular/core';
import {WeatherService} from '../weather.service';
import {LocationService} from '../location.service';
import {Router} from '@angular/router';
import {ConditionsAndZip} from '../conditions-and-zip.type';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-current-conditions',
    templateUrl: './current-conditions.component.html',
    styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent {

    private router = inject(Router);
    protected weatherService = inject(WeatherService);
    protected locationService = inject(LocationService);
    protected currentConditionsByZip: Signal<ConditionsAndZip[]> = this.weatherService.getCurrentConditions();

    constructor() {
        // Initial load of current conditions
        if (this.locationService.locations.length > 0 && this.currentConditionsByZip().length === 0){
            this.locationService.locations.forEach(location => {
                this.weatherService.addCurrentConditions(location);
            });
        }

        this.locationService.locationAddedSubject.pipe(takeUntilDestroyed()).subscribe(location => {
            this.weatherService.addCurrentConditions(location);
        });

        this.locationService.locationRemovedSubject.pipe(takeUntilDestroyed()).subscribe(location => {
            this.weatherService.removeCurrentConditions(location);
        });
    }

    showForecast(zipcode: string) {
        this.router.navigate(['/forecast', zipcode])
    }
}
