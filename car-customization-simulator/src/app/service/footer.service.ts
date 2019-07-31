import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  public footerValues: any;

  constructor() { }


  updateValues(selectedEnginePrice: number, selectedEngineModel: string): any {
    this.footerValues = {
      enginePrice: selectedEnginePrice,
      engineModel: selectedEngineModel,
    };
  }

  getValues(): any {
    return this.footerValues;
  }

}
