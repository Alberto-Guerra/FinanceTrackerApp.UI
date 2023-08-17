import { Transaction } from "src/app/models/Transaction";
import { TimeSelector } from "./time-selector";
import { BaseSelector } from "./base-selector";

export class DaySelector extends BaseSelector {

    public getString(): string {
        return "Today";
    }

    public getAbstractTransactions(transactions: Transaction[]): Transaction[] {
        //return transactions that are from today
        return transactions.filter(transaction => transaction.date?.split('T')[0] === new Date().toISOString().split('T')[0]);
    
    }
}