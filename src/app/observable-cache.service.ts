import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';


@Injectable()
export class ObservableCacheService {

    TWO_HOUR_EXPIRATION = 7200000;

    getCachedObservable<T>(id: string, params: any, observable: Observable<T>, expiration = this.TWO_HOUR_EXPIRATION): Observable<T> {
        const localStorageId = `${id}-${JSON.stringify(params)}`;
        const cachedData = localStorage.getItem(localStorageId);
        const cacheCreationTime = localStorage.getItem(`${localStorageId}-cache-creation-time`);
        if (cachedData && cacheCreationTime && (Date.now() - +cacheCreationTime < expiration)) {
            return of(JSON.parse(cachedData));
        } else {
            return observable.pipe(tap(data => {
                localStorage.setItem(localStorageId, JSON.stringify(data));
                localStorage.setItem(`${localStorageId}-cache-creation-time`, Date.now().toString());
            }));
        }
    }
}
