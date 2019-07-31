import { Component, OnInit, ɵConsole } from '@angular/core';
import { CustomizationService } from '../service/customization.service';
import { ItemsEngine } from '../models/items-engine';
import { FooterService } from '../service/footer.service';

@Component({
  selector: 'app-engine',
  templateUrl: './engine.component.html',
  styleUrls: ['./engine.component.scss']
})
export class EngineComponent implements OnInit {

  public colorLink = '/color';
  public engines = [];
  public enginePrice = 0;
  public imageURL: string;
  public engineModel: string;

  constructor(
    private service: CustomizationService,
    private footerService: FooterService,
  ) { }

  ngOnInit() {
    this.callListEngines();

  }

  public changeChoice(engine: ItemsEngine): void {
    console.log('changeChoice', engine);
    this.changeEngineImage(engine.id);
    this.selectEngine(engine.id);
    this.showEnginePrice(engine.price, engine.id);
    this.updateFooter(engine.price, engine.kwh, engine.type);
  }

  private updateFooter(price: number, kwh: number, type: string) {
    this.engineModel = `${kwh} ${type}`;
    this.footerService.updateValues(price, this.engineModel);
  }

  private callListEngines(): void {
    this.service.list()
      .subscribe(
        (resp) => {
          if (resp && resp.engine && resp.engine.items && resp.engine.items.length > 0) {
            this.engines = resp.engine.items;
            this.imageURL = `../../assets/images/engines/${resp.engine.items[0].id}.png`;
            this.engineModel = `${resp.engine.items[0].kwh} ${resp.engine.items[0].type}`;
          }
        }
      );
  }

  private selectEngine(id: number): void {
    const selectedEngine = document.getElementById(`engine-${id}`) as HTMLInputElement;
    selectedEngine.checked = true;
  }


  private changeEngineImage(id: number): void {
    this.imageURL = `../../assets/images/engines/${id}.png`;
  }

  private showEnginePrice(price: number, id: number): void {
    this.enginePrice = price;
    let priceEl = document.querySelectorAll('.price') as NodeListOf<HTMLElement>;
    priceEl.forEach((item) => {
      if (item.id === `price-${id}` && this.enginePrice > 0) {
        const selected = document.getElementById(`price-${id}`) as HTMLElement;
        selected.classList.remove('not-show-price');
      } else {
        const notSelected = document.getElementById(item.id) as HTMLElement;
        notSelected.classList.add('not-show-price');
      }
    });
  }
}
