import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public openMenuBar(): void {
    const element = document.getElementById('menu') as HTMLElement;
    if (element.classList.contains('responsive')) {
      element.classList.remove('responsive');
    } else {
      element.classList.add('responsive');
    }
  }

}
