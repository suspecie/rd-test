import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, publishReplay, refCount } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Config } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class CustomizationService {

  private readonly API_URL = 'https://next.json-generator.com/api/json/get/41ORKNZDU';
  public configs: Observable<Config[]>;

  constructor(private http: HttpClient) { }

  listEngines(): Observable<any> {

    if (!this.configs) {
      this.configs = this.http.get<any>(this.API_URL)
      .pipe(
        map((resp) => {
          let newResp = [];
          if (resp && resp["data"] && resp["data"].engine && resp["data"].engine.items && resp["data"].engine.items.length > 0) {
            newResp = resp["data"].engine.items;
          }
          return newResp;
        }),
        publishReplay(1),
        refCount(),
      );
    }

    return this.configs;

  }

  clearCache() {
    this.configs = null;
  }
}
