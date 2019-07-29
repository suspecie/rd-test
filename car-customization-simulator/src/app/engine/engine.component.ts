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
  public imageURL = '';

  constructor(
    private service: CustomizationService
  ) { }

  ngOnInit() {
    this.callListEngines();
  }

  public changeChoice(engine:Engine): void {
    this.imageURL = `../../assets/images/engines/${engine.id}.png`;
  }

  private callListEngines(): void {
    this.service.listEngines()
      .subscribe(
        (resp) => {
          this.engines = resp;
          console.log('engines', this.engines);
        }
      );
  }

}
