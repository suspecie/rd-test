import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input()
  public nextPage = '';

  @Input()
  public newPrice = 0;

  public totalPrice = 0;

  constructor() { }

  ngOnInit() {

  }

  private sumPrices() {
    const price = 63000; //pegar da api
    this.totalPrice = price + this.newPrice;
  }

}