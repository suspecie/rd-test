import { Component, OnInit } from '@angular/core';
import { CustomizationService } from '../service/customization.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {

  public wheelsLink = '/wheels';
  public colors = [];
  public description;


  constructor(
    private service: CustomizationService,
  ) { }

  ngOnInit() { 
    this.callListColors();
  }

  private callListColors(): void {
    this.service.list()
      .subscribe(
        (resp) => {
          console.log('cor', resp);
          if (resp && resp.color && resp.color.items && resp.color.items.length > 0) {
            this.colors = resp.color.items;
            this.description = resp.color.description;
          }
        }
      );
  }

}
