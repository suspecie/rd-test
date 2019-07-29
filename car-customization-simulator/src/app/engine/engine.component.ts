import { Component, OnInit } from '@angular/core';
import { CustomizationService } from '../customization.service';
import { Engine } from '../models/engine';

@Component({
  selector: 'app-engine',
  templateUrl: './engine.component.html',
  styleUrls: ['./engine.component.scss']
})
export class EngineComponent implements OnInit {

  public colorLink = '/color';
  public engines: Engine[];

  constructor(private service: CustomizationService) { }

  ngOnInit() {
    this.service.listEngines()
      .subscribe(
        (resp) => {
          this.engines = resp;
          console.log('engines', this.engines);
        }
      );
  }

}
