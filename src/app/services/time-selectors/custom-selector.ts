import { Transaction } from "src/app/models/Transaction";
import { BaseSelector } from "./base-selector";

export class CustomSelector extends BaseSelector{

    private startDate : Date;
    private endDate : Date;

    constructor(startDate : Date, endDate : Date){
        super();
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public override getString(): string {
        return "from " + this.startDate.toISOString().substring(0, 10) + " to " + this.endDate.toISOString().substring(0, 10);
    }
    public override getAbstractTransactions(transactions: Transaction[]): Transaction[] {

        if(this.startDate == this.endDate){ // if the start and end date are the same, just return the transactions on that day
            return transactions.filter((transaction : Transaction) => {
                var date = new Date(transaction.date);
     
                 return date == this.startDate;
             });
        }


        return transactions.filter((transaction : Transaction) => {
           var date = new Date(transaction.date);

            return date >= this.startDate && date <= this.endDate;
        });
    }

}