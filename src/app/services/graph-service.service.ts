import { Injectable } from '@angular/core';
import { MonthBarGraph } from './graphs/monthBarGraph';
import { CategoryPieGraph } from './graphs/categoryPieGraph';
import { CommunicationService } from './communication-service.service';

@Injectable({
  providedIn: 'root'
})
export class GraphService {


  graphs : Graph[] = [  ];


}

export interface Graph{

  name : string;
  options : any;
  getOptions() : any;

}

export enum ChartType {
  Column = "column",
  Bar = "bar",
  Line = "line",
  Area = "area",
  Pie = "pie"
}
