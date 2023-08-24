import { Transaction } from "src/app/models/Transaction";
import { CommunicationService } from "../communication-service.service";
import { ChartType, Graph } from "../graph-service.service";
import { BaseGraph } from "./BaseGraph";
import { Category } from "src/app/models/Category";
import { TimeSelector } from "../time-selectors/time-selector";
import { MonthSelector } from "../time-selectors/month-selector";

export class CategoryPieGraph implements Graph {

    name: string = "Spent Distribution"

    categories : Category[] = [];
    totalSpent : number = 0;
    selector : TimeSelector = new MonthSelector();

    options: any;

    getOptions() {
        return this.options;
    }

    constructor(service : CommunicationService) {

        service.getCategories().subscribe((categories) => {
            this.categories = categories;
            this.options = this.calculateOptions();
        });

        service.getAllTransactions().subscribe((transactions) => {
            this.totalSpent = this.selector.getSpent(transactions);
            this.options = this.calculateOptions();
            
        });

    }

    calculateOptions() {
        var options = {
            animationEnabled: true,
            exportEnabled: true,
            backgroundColor: "transparent",
            title: {
                text: 'Spent Distribution Per Category',
                fontFamily: "Kufam",
                fontWeight: "700",
            },

            
            data: [{
                type: ChartType.Pie,
                indexLabel: "{name}: {y}€",
                dataPoints: this.calculateDataPoints(this.categories)
                
            }]
        }
        return options;
    }

    calculateDataPoints(categories: Category[]): { name: string; y: number;}[] {

        var dataPoints : {name : string, y : number}[] = [];


        categories.forEach((category) => {
            dataPoints.push({ name: category.name, y: this.calculateCategorySpent(category) })
        });


        return dataPoints; 

    }

    calculatePercentage(category : Category) : number{

        var total : number = 0;
        for(let transaction of category.transactions){
            if(transaction.amount < 0)
                total += transaction.amount;
        }

        var percentage : number = total / this.totalSpent * 100;

        return percentage;

    }

    calculateCategorySpent(category : Category) : number{
            
            var total : number = 0;
            for(let transaction of this.selector.getExpenses(category.transactions)){
                total += transaction.amount;
            }
            
            return total < 0 ? -1 * total : total;
    
        }

   

}

