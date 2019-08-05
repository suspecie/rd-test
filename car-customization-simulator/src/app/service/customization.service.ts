import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, publishReplay, refCount } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Config } from '../models/config';

@Injectable({
  providedIn: 'root'
})
export class CustomizationService {

  public configs: Observable<Config[]>;
  private readonly API_URL = 'https://next.json-generator.com/api/json/get/41ORKNZDU';

  constructor(private http: HttpClient) { }

  /**
   * This method call API_URL
   * and reserve result in variable configs.
   * So cache it once if configs value is false.
   */
  list(): Observable<any> {

    if (!this.configs) {
      this.configs = this.http.get<Config[]>(this.API_URL)
      .pipe(
        map((resp) => {
          let newResp = [];
          if (resp && resp['data']) {
            newResp = resp['data'];
          }
          return newResp;
        }),
        publishReplay(1), // this tells Rx to cache the latest emitted
        refCount(), // and this tells Rx to keep the Observable alive as long as there are any Subscribers
      );
    }

    return this.configs;

  }

  clearCache() {
    this.configs = null;
  }
}
