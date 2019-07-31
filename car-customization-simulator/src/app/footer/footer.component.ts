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

  public defaultPrice = 0;

  public totalPrice = 0;

  constructor(
    private service: CustomizationService,
    private footerService: FooterService,
  ) { }

  ngOnInit() {
    console.log('init footer');
    this.getDefaultPrice();
    console.log('enginePricefooter', this.footerService.getValues());
  }

  ngOnChanges(): void {
    console.log('change footer');

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

  private updatePrice() {
    this.totalPrice = this.defaultPrice + this.newEnginePrice ;
    console.log('engineprice', this.newEnginePrice);
    console.log('totalprice', this.totalPrice);
  }

}
