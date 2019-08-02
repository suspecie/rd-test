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
          if (resp && resp.price) {
            this.defaultPrice = resp.price;
          }
        }
      );
  }

  private getLastChoices(): void {
    const lastSummaryValues = this.summaryService.getValues();
    if (lastSummaryValues) {
      this.engineName = lastSummaryValues.engineName;
      this.enginePrice = lastSummaryValues.enginePrice;
      this.updatePrice();
      console.log('lastSummaryValues', lastSummaryValues);
    }
  }

  private updatePrice(): void {
    this.totalPrice = this.defaultPrice + this.enginePrice;
  }

}
