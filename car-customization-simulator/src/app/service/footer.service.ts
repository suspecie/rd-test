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
    selectedWheelImage: string,
    selectedWheelPrice: number,
  ): any {
    this.footerValues = {
      enginePrice: selectedEnginePrice,
      engineModel: selectedEngineModel,
      colorImage: selectedColorImage,
      colorPrice: selectedColorPrice,
      wheelImage: selectedWheelImage,
      wheelPrice: selectedWheelPrice,
    };
  }

  getValues(): any {
    return this.footerValues;
  }

}
