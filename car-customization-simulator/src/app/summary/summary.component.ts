import { Component, OnInit } from '@angular/core';
import { CustomizationService } from '../service/customization.service';
import { SummaryService } from '../service/summary.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  public defaultPrice = 0;
  public engineName = '';
  public enginePrice = 0;
  public totalPrice = 0;
  public colorName = '';
  public colorPrice = 0;
  public wheelName = '';
  public wheelPrice = 0;
  public urlCarImage = '';

  constructor(
    private service: CustomizationService,
    private summaryService: SummaryService,
  ) { }

  ngOnInit() {
    this.getDefaultPrice();
    this.getLastChoices();
  }

  private getDefaultPrice(): void {
    this.service.list()
      .subscribe(
        (resp) => {
          if (resp) {
            if (resp.engine && resp.engine.items && resp.engine.items.length > 0) {
              this.engineName = `
              ${resp.engine.items[0].kwh}
              ${resp.engine.items[0].type} - ${resp.engine.items[0].kwh} KWh - 
              ${resp.engine.items[0].range} miles range
              `;
              this.enginePrice = resp.engine.items[0].price;
            }

            if (resp.color && resp.color && resp.color.items && resp.color.items.length > 0) {
              this.colorName = resp.color.items[0].label;
              this.colorPrice = resp.color.items[0].price;
              this.urlCarImage = `../../assets/images/summary/final-${resp.color.items[0].id}.png`;
            }

            if (resp.wheels && resp.wheels.items && resp.wheels.items.length > 0) {
              this.wheelName = resp.wheels.items[0].label;
              this.wheelPrice = resp.wheels.items[0].price;
            }

            if (resp.price) {
              this.defaultPrice = resp.price;
            }

            this.updatePrice();
          }
        }
      );
  }

  private getLastChoices(): void {
    const lastSummaryValues = this.summaryService.getValues();
    if (lastSummaryValues) {
      this.engineName = lastSummaryValues.engineName;
      this.enginePrice = lastSummaryValues.enginePrice;
      this.colorName = lastSummaryValues.colorName;
      this.colorPrice = lastSummaryValues.colorPrice;
      this.wheelName = lastSummaryValues.wheelName;
      this.wheelPrice = lastSummaryValues.wheelPrice;
      this.urlCarImage = `../../assets/images/summary/final-${lastSummaryValues.chosenColor}.png`;
      this.updatePrice();
    }
  }

  private updatePrice(): void {
    this.totalPrice = this.defaultPrice + this.enginePrice + this.colorPrice + this.wheelPrice;
  }

}
