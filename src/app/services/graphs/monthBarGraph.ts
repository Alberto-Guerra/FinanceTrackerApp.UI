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

    constructor(private service : CommunicationService) {

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
                valueFormatString: "####€"
            },
            axisX:{
                interval: 1
             },
            data: [{
                type: ChartType.Column,
                indexLabelFontColor: '#5A5757',
                yValueFormatString: "####€",
                dataPoints: this.calculateDataPoints(this.transactions)
            }]
        }


        return options;
    }

    calculateDataPoints(transactions: Transaction[]): { label: string; y: number; indexLabel?: string | undefined; }[] {

        var dataPoints : {label : string, y : number, indexLabel? : string}[] = [];

        var months : string[] = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        //var months : number[] = [1,2,3,4,5,6,7,8,9,10,11,12]

        var spentPerMonth : number[] = [0,0,0,0,0,0,0,0,0,0,0,0];

        transactions.forEach((transaction : Transaction) => {
            var date = new Date(transaction.date);

            if(date.getFullYear() == new Date().getFullYear())
                spentPerMonth[date.getMonth()] += transaction.amount;
        }
        );

        for(var i = 0; i < spentPerMonth.length; i++){
            if(spentPerMonth[i] != 0)
            dataPoints.push({label : months[i], y : spentPerMonth[i], indexLabel : spentPerMonth[i] + "€"});
            else {
                dataPoints.push({label : months[i], y : spentPerMonth[i]});
            }
        }
        
        return dataPoints;


    }

   

}

