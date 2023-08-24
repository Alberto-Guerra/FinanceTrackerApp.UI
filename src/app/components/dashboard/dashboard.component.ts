import { Component } from '@angular/core';
import { CanvasJS } from '@canvasjs/angular-charts';
import { CommunicationService } from 'src/app/services/communication-service.service';
import { Graph, GraphService } from 'src/app/services/graph-service.service';
import { CategoryPieGraph } from 'src/app/services/graphs/categoryPieGraph';
import { MonthBarGraph } from 'src/app/services/graphs/monthBarGraph';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  title : string = "Dahsboard"

  actualGraph! : Graph ;
  actualGraphIndex : number = 0;
  graphs : Graph[] = [];
  graphIndexs : number[] = [];
  options : any ;

  chart : any;


  constructor(private service : CommunicationService){
	
  }

  ngOnInit(){

	this.graphs = [new MonthBarGraph(this.service), new CategoryPieGraph(this.service)];
	this.graphIndexs = [0,1];
	this.actualGraph = this.graphs[this.actualGraphIndex];
	this.options = this.actualGraph.getOptions();

  this.chart = new CanvasJS.Chart("chartContainer",this.options);
  this.chart.render();


    this.service.getAllTransactions().subscribe(() => {
      this.chart.options = this.actualGraph.getOptions();
      this.chart.render();
    });
	this.service.getCategories().subscribe(() => {
		this.chart.options = this.actualGraph.getOptions();
    this.chart.render();
	});




}

onGraphChange(){
  this.actualGraph = this.graphs[this.actualGraphIndex];
  this.chart.options = this.actualGraph.getOptions();
  this.chart.render();

}
}
