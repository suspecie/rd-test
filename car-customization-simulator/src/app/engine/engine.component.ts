import { Component, OnInit } from '@angular/core';
import { CustomizationService } from '../service/customization.service';

@Component({
  selector: 'app-engine',
  templateUrl: './engine.component.html',
  styleUrls: ['./engine.component.scss']
})
export class EngineComponent implements OnInit {

  public colorLink = '/color';
  public engines: any;
  public imageURL = '../../assets/images/engines/1.png';

  constructor(
    private service: CustomizationService
  ) { }

  ngOnInit() {
    this.callListEngines();

  }

  public changeChoice(engine: any): void {
    this.imageURL = `../../assets/images/engines/${engine.id}.png`;
    const selectedEngine = document.getElementById(`engine-${engine.id}`) as HTMLInputElement;
    selectedEngine.checked = true;
  }

  private callListEngines(): void {
    this.service.list()
      .subscribe(
        (resp) => {
          this.engines = resp;
          console.log('engines', this.engines);
        }
      );
  }

}
