import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  public footerValues: any;

  constructor() { }


  updateValues(
    selectedEnginePrice: number,
    selectedEngineModel: string,
    selectedColorImage: string,
    selectedColorPrice: number,
  ): any {
    this.footerValues = {
      enginePrice: selectedEnginePrice,
      engineModel: selectedEngineModel,
      colorImage: selectedColorImage,
      colorPrice: selectedColorPrice,
    };
  }

  getValues(): any {
    return this.footerValues;
  }

}
