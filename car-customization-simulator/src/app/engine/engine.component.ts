import { Component, OnInit } from '@angular/core';
import { CustomizationService } from '../service/customization.service';
import { ItemsEngine } from '../models/items-engine';

@Component({
  selector: 'app-engine',
  templateUrl: './engine.component.html',
  styleUrls: ['./engine.component.scss']
})
export class EngineComponent implements OnInit {

  public colorLink = '/color';
  public imageURL = '../../assets/images/engines/1.png';
  public engines = [];
  public enginePrice = 0;

  constructor(
    private service: CustomizationService
  ) { }

  ngOnInit() {
    this.callListEngines();

  }

  public changeChoice(engine: ItemsEngine): void {
    console.log('changeChoice', engine);
    this.imageURL = `../../assets/images/engines/${engine.id}.png`;
    const selectedEngine = document.getElementById(`engine-${engine.id}`) as HTMLInputElement;
    selectedEngine.checked = true;
    this.enginePrice = engine.price;
  }

  private callListEngines(): void {
    this.service.list()
      .subscribe(
        (resp) => {
          if (resp && resp.engine && resp.engine.items && resp.engine.items.length > 0) {
            this.engines = resp.engine.items;
          }
          console.log('engines', this.engines);
        }
      );
  }

}
