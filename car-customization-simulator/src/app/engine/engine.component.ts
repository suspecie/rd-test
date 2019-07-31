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
  public imageURL = '../../assets/images/engines/1.png';
  public engines = [];
  public enginePrice = 0;

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
    this.updateFooter(engine.price);
  }

  private updateFooter(price) {
    this.footerService.updateValues(price);
  }

  private callListEngines(): void {
    this.service.list()
      .subscribe(
        (resp) => {
          if (resp && resp.engine && resp.engine.items && resp.engine.items.length > 0) {
            this.engines = resp.engine.items;
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
