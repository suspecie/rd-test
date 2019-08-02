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

  public changeChoice(id: number, price: number): void {
    this.changeImgOpacity(id);
    this.showFigure(id);
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

  private changeImgOpacity(id: number): void {
    let imgEl = document.querySelectorAll('img') as NodeListOf<HTMLElement>;
    imgEl.forEach((item) => {

      if (item.id === `wheel-img-${id}`) {
        const wheelImg = document.getElementById(`wheel-img-${id}`) as HTMLElement;
        wheelImg.classList.add('selected');
        wheelImg.classList.remove('not-selected');
      } else {
        const notSelectedWheelImg = document.getElementById(item.id) as HTMLElement;
        notSelectedWheelImg.classList.add('not-selected');
        notSelectedWheelImg.classList.remove('selected');
      }
    });
  }

  private showFigure(id: number): void {
    let descEl = document.querySelectorAll('figcaption') as NodeListOf<HTMLElement>;
    descEl.forEach((item) => {
      if (item.id === `wheel-desc-${id}`) {
        const wheelDescription = document.getElementById(`wheel-desc-${id}`) as HTMLElement;
        wheelDescription.classList.add('show');
        wheelDescription.classList.remove('not-show');
      } else {
        const notSelectedWheelDescription = document.getElementById(item.id) as HTMLElement;
        notSelectedWheelDescription.classList.add('not-show');
        notSelectedWheelDescription.classList.remove('show');
      }
    });
  }
}
