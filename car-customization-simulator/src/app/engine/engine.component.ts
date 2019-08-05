import { Component, OnInit, ɵConsole } from '@angular/core';
import { CustomizationService } from '../service/customization.service';
import { ItemsEngine } from '../models/items-engine';
import { FooterService } from '../service/footer.service';
import { SummaryService } from '../service/summary.service';

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
    private summaryService: SummaryService,
  ) { }

  ngOnInit() {
    this.callListEngines();

  }

  public changeChoice(engine: ItemsEngine): void {
    this.changeEngineImage(engine.id);
    this.selectEngine(engine.id);
    this.showEnginePrice(engine.price, engine.id);
    this.updateFooter(engine.price, engine.kwh, engine.type);
    this.updateSummary(engine.kwh, engine.type, engine.range, engine.price);
    this.enableEngine(engine.id);
  }

  private callListEngines(): void {
    this.service.list()
      .subscribe(
        (resp) => {
          if (resp && resp.engine && resp.engine.items && resp.engine.items.length > 0) {
            this.engines = resp.engine.items;
            this.imageURL = `../../assets/images/engines/${resp.engine.items[0].id}.png`;
            this.engineModel = `${resp.engine.items[0].kwh} ${resp.engine.items[0].type}`;

            this.enableEngine(resp.engine.items[0].id);

            this.updateFooter(resp.engine.items[0].price, resp.engine.items[0].kwh, resp.engine.items[0].type);
            this.updateSummary(resp.engine.items[0].kwh, resp.engine.items[0].type, resp.engine.items[0].range, resp.engine.items[0].price);
          }
        }
      );
  }

  private changeEngineImage(id: number): void {
    this.imageURL = `../../assets/images/engines/${id}.png`;
  }

  private selectEngine(id: number): void {
    const selectedEngine = document.getElementById(`engine-${id}`) as HTMLInputElement;
    selectedEngine.checked = true;
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

  private updateFooter(price: number, kwh: number, type: string) {
    this.engineModel = `${kwh} ${type}`;
    this.footerService.updateValues(price, this.engineModel, null, null, null, null);
  }

  private updateSummary(kwh: number, type: string, range: number, price: number): void {
    const engineName = `${kwh} ${type} - ${kwh} KWh - ${range} miles range`;
    this.summaryService.updateValues(engineName, price, null, null, null, null, null);
  }

  private enableEngine(id: number): void {
    let el = document.querySelectorAll('.text') as NodeListOf<HTMLElement>;
    if (el.length === 0) {
      setTimeout(() => {
        this.addClass('selected', `line-${id}`);
        this.removeClass('not-selected', `line-${id}`);
      }, 200);
    } else {
      el.forEach((item) => {
        if (item.id === `line-${id}`) {
          this.addClass('selected', `line-${id}`);
          this.removeClass('not-selected', `line-${id}`);
        } else {
          this.addClass('not-selected', item.id);
          this.removeClass('selected', item.id);
        }
      });
    }
  }

  private addClass(classCss: string, field: string): void {
    const element = document.getElementById(field) as HTMLElement;
    element.classList.add(classCss);
  }

  private removeClass(classCss: string, field: string): void {
    const element = document.getElementById(field) as HTMLElement;
    element.classList.remove(classCss);
  }

}
