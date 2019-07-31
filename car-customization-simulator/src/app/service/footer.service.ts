import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  public footerValues: any;

  constructor() { }


  updateValues(engine): any {
    this.footerValues = {
      enginePrice: engine,
    };
  }

  getValues(): any {
    return this.footerValues;
  }

  // list(): Observable<any> {

  //   if (!this.configs) {
  //     this.configs = this.http.get<any>(this.API_URL)
  //     .pipe(
  //       map((resp) => {
  //         let newResp = [];
  //         if (resp && resp['data']) {
  //           newResp = resp['data'];
  //         }
  //         return newResp;
  //       }),
  //       publishReplay(1), // this tells Rx to cache the latest emitted
  //       refCount(), // and this tells Rx to keep the Observable alive as long as there are any Subscribers
  //     );
  //   }

  //   return this.configs;

  // }

  // clearCache() {
  //   console.log('entrei no clearCache');
  //   this.configs = null;
  // }
}
