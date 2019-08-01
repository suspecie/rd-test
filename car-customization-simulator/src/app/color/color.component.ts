import { Component, OnInit } from '@angular/core';
import { CustomizationService } from '../service/customization.service';
import { ItemsColor } from '../models/items-color';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {

  public wheelsLink = '/wheels';
  public colors = [];
  public description;
  public urlCarImage: string;
  public colorName: string;
  public colorPrice: number;


  constructor(
    private service: CustomizationService,
  ) { }

  ngOnInit() {
    this.callListColors();
  }

  public changeColor(color: ItemsColor): void {
    this.urlCarImage = `../../assets/images/colors/${color.id}.png`;
    this.colorName = color.label;
    this.colorPrice = color.price;
    console.log('mudando a cor');
  }

  private callListColors(): void {
    this.service.list()
      .subscribe(
        (resp) => {
          console.log('cor', resp);
          if (resp && resp.color && resp.color.items && resp.color.items.length > 0) {
            this.colors = resp.color.items;
            this.description = resp.color.description;
            this.urlCarImage = `../../assets/images/colors/${resp.color.items[0].id}.png`;
            this.colorName = resp.color.items[0].label;
            this.colorPrice = resp.color.items[0].price;
          }
        }
      );
  }

}
