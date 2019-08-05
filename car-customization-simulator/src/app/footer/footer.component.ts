import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CustomizationService } from '../service/customization.service';
import { FooterService } from '../service/footer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnChanges {

  @Input()
  public nextPage = '';

  @Input()
  public newEnginePrice = 0;

  @Input()
  public newEngineModel = '';

  @Input()
  public newColorImage = '';

  @Input()
  public newColorPrice = 0;

  @Input()
  public newWheelImage = '';

  @Input()
  public newWheelPrice = 0;

  public defaultPrice = 0;
  public totalPrice = 0;

  constructor(
    private service: CustomizationService,
    private footerService: FooterService,
  ) { }

  ngOnInit() {
    this.getLastChoices();
    this.getDefaultPrice();
  }

  ngOnChanges(): void {
    this.updatePrice();

  }

  private getDefaultPrice(): void {
    this.service.list()
      .subscribe(
        (resp) => {
          if (resp && resp.price) {
            this.defaultPrice = resp.price;
            this.updatePrice();
          }
        }
      );
  }

  private getLastChoices(): void {
    const lastFooterValues = this.footerService.getValues();
    if (lastFooterValues) {
      this.newEnginePrice = lastFooterValues.enginePrice;
      this.newEngineModel = lastFooterValues.engineModel;
      this.newColorImage = lastFooterValues.colorImage;
      this.newColorPrice = lastFooterValues.colorPrice;
      this.newWheelImage = lastFooterValues.wheelImage;
      this.newWheelPrice = lastFooterValues.wheelPrice;
    }
  }

  private updatePrice() {
    this.totalPrice = this.defaultPrice + this.newEnginePrice + this.newColorPrice + this.newWheelPrice;
  }

}
