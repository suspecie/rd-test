import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { EngineComponent } from './engine/engine.component';
import { ColorComponent } from './color/color.component';
import { WheelsComponent } from './wheels/wheels.component';
import { SummaryComponent } from './summary/summary.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'engine', component: EngineComponent },
  { path: 'color', component: ColorComponent },
  { path: 'wheels', component: WheelsComponent},
  { path: 'summary', component: SummaryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
