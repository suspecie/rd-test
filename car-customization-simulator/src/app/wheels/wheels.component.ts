import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wheels',
  templateUrl: './wheels.component.html',
  styleUrls: ['./wheels.component.scss']
})
export class WheelsComponent implements OnInit {

  public summaryLink = '/summary';
  
  constructor() { }

  ngOnInit() {
  }

}
