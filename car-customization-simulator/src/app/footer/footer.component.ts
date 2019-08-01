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
    console.log('newprice update', this.newEnginePrice);
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
          console.log('defaultprice', this.defaultPrice);
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
      console.log('newColorPrice', lastFooterValues.colorPrice);
    }
  }

  private updatePrice() {
    this.totalPrice = this.defaultPrice + this.newEnginePrice + this.newColorPrice;
    console.log('engineprice', this.newEnginePrice);
    console.log('colorprice', this.newColorPrice);
    console.log('totalprice', this.totalPrice);
  }

}
