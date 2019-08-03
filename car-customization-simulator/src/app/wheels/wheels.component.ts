import { Component, OnInit } from '@angular/core';
import { CustomizationService } from '../service/customization.service';
import { FooterService } from '../service/footer.service';
import { SummaryService } from '../service/summary.service';

@Component({
  selector: 'app-wheels',
  templateUrl: './wheels.component.html',
  styleUrls: ['./wheels.component.scss']
})
export class WheelsComponent implements OnInit {

  public summaryLink = '/summary';
  public wheels = [];
  public wheelImage: string;
  public wheelPrice: number;


  constructor(
    private service: CustomizationService,
    private footerService: FooterService,
    private summaryService: SummaryService,
  ) { }

  ngOnInit() {
    this.callListWheels();
  }

  public changeChoice(id: number, price: number, label: string): void {
    this.setFooterValues(id, price);
    this.changeImgOpacity(id);
    this.showFigure(id);
    this.updateFooter();
    this.updateSummary(label);
  }

  private callListWheels(): void {
    this.service.list()
      .subscribe(
        (resp) => {
          if (resp && resp.wheels && resp.wheels.items && resp.wheels.items.length > 0) {
            this.wheels = resp.wheels.items;
            this.changeChoice(resp.wheels.items[0].id, resp.wheels.items[0].price, resp.wheels.items[0].label);
          }
        }
      );
  }

  private updateFooter(): void {
    const lastFooterValues = this.footerService.getValues();
    if (lastFooterValues) {
      this.footerService
        .updateValues(
          lastFooterValues.enginePrice,
          lastFooterValues.engineModel,
          lastFooterValues.colorImage,
          lastFooterValues.colorPrice,
          this.wheelImage,
          this.wheelPrice,
        );
    }
  }

  private updateSummary(label: string): void {
    const lastSummaryValues = this.summaryService.getValues();
    if (lastSummaryValues) {
      this.summaryService
        .updateValues(
          lastSummaryValues.engineName,
          lastSummaryValues.enginePrice,
          lastSummaryValues.colorName,
          lastSummaryValues.colorPrice,
          lastSummaryValues.chosenColor,
          label,
          this.wheelPrice
        );
    }
  }

  private setFooterValues(id: number, price: number): void {
    this.wheelImage = `../../assets/images/wheels/${id}.png`;
    this.wheelPrice = price;
  }

  private changeImgOpacity(id: number): void {
    let imgEl = document.querySelectorAll('.wheel-img') as NodeListOf<HTMLElement>;
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
