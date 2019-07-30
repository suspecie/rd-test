import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CustomizationService } from '../service/customization.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnChanges {

  @Input()
  public nextPage = '';

  @Input()
  public newPrice = 0;

  public totalPrice = 0;

  constructor(
    private service: CustomizationService
  ) { }

  ngOnInit() {
    this.getDefaultPrice();
  }

  ngOnChanges(): void {
    console.log('newprice update', this.newPrice);
    this.updatePrice();

  }

  private getDefaultPrice(): void {
    this.service.list()
      .subscribe(
        (resp) => {
          if (resp && resp.price) {
            this.totalPrice = resp.price;
          }
          console.log('price', this.totalPrice);
        }
      );
  }

  private updatePrice() {
    this.totalPrice += this.newPrice;
    console.log('updateprice', this.totalPrice);
  }


}