import { Component, OnInit } from '@angular/core';
import { CustomizationService } from '../customization.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {

  public wheelsLink = '/wheels';
  
  constructor(private service: CustomizationService) { }

  ngOnInit() {
    this.callListEngines();
  }

  private callListEngines(): void {
    this.service.listEngines()
      .subscribe(
        (resp) => {
          console.log('COLORS', resp);
        }
      );
  }

}
