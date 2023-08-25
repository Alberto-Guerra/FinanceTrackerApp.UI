import { Transaction } from "src/app/models/Transaction";
import { CommunicationService } from "../communication-service.service";
import { ChartType, Graph } from "../graph-service.service";
import { BaseGraph } from "./BaseGraph";

export class MonthBarGraph implements Graph {

    transactions : Transaction[] = [];

    name: string = "Balance Per Month"

    options: any;

    getOptions() {
        return this.options;
    }

    constructor(service : CommunicationService) {

        service.getAllTransactions().subscribe((transactions) => {
            this.transactions = transactions;
            this.options = this.calculateOptions();
        });

    }

    calculateOptions() {
        var options = {
            backgroundColor: "transparent",
            title: {
                text: 'Balance Per Month',
                fontFamily: "Kufam",
                fontWeight: "700",
            },
            animationEnabled: true,
            axisY: {
                includeZero: true,
                valueFormatString: "####€",
                stripLines: [{
                    value: 0,
                    color: "#990000",
                    thickness: 2
                  }],
                
            },
            axisX:{
                
                interval: 1,
                
             },
            data: [{
                type: ChartType.Column,
                yValueFormatString: "####.##€",
                dataPoints: this.calculateDataPoints(this.transactions)
            }]
        }


        return options;
    }

    calculateDataPoints(transactions: Transaction[]): { label: string; y: number; indexLabel?: string | undefined; }[] {

        var dataPoints : {label : string, y : number, indexLabel? : string}[] = [];

        var months : string[] = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

        var spentPerMonth : number[] = [0,0,0,0,0,0,0,0,0,0,0,0];

        transactions.forEach((transaction : Transaction) => {
            var date = new Date(transaction.date);

            if(date.getFullYear() == new Date().getFullYear())
                spentPerMonth[date.getMonth()] += transaction.amount;
        }
        );

        for(var i = 0; i < spentPerMonth.length; i++){
            
            dataPoints.push({label : months[i], y : spentPerMonth[i]});
            
        }
        
        return dataPoints;


    }

   

}

