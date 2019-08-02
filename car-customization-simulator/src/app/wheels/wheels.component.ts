import { Component, OnInit } from '@angular/core';
import { CustomizationService } from '../service/customization.service';

@Component({
  selector: 'app-wheels',
  templateUrl: './wheels.component.html',
  styleUrls: ['./wheels.component.scss']
})
export class WheelsComponent implements OnInit {

  public summaryLink = '/summary';
  public wheels = [];

  constructor(
    private service: CustomizationService,
  ) { }

  ngOnInit() {
    this.callListWheels();
  }

  private callListWheels(): void {
    this.service.list()
      .subscribe(
        (resp) => {
          if (resp && resp.wheels && resp.wheels.items && resp.wheels.items.length > 0) {
            this.wheels = resp.wheels.items;
          }
        }
      );
  }

}
