import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Engine } from './models/engine';

@Injectable({
  providedIn: 'root'
})
export class CustomizationService {

  private readonly API_URL = 'https://next.json-generator.com/api/json/get/41ORKNZDU';

  constructor(private http: HttpClient) { }

  listEngines() {
    return this.http.get<Engine[]>(this.API_URL)
      .pipe(
        map((resp) => {
          let newResp = [];
          if (resp && resp["data"] && resp["data"].engine && resp["data"].engine.items && resp["data"].engine.items.length > 0) {
            newResp = resp["data"].engine.items;
          }
          return newResp;
        }),
      );
  }
}
