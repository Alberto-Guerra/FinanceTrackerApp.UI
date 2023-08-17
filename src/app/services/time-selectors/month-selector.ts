import { Transaction } from "src/app/models/Transaction";
import { BaseSelector } from "./base-selector";

export class MonthSelector extends BaseSelector {

    public getString(): string {
        return "this Month";
    }

    public getAbstractTransactions(transactions: Transaction[]): Transaction[] {
        //return transactions that are from this month
        return transactions.filter(transaction => {
            const transactionDate = new Date(transaction.date?.split('T')[0] + "T00:00:00");
            const today = new Date();
            return transactionDate.getFullYear() === today.getFullYear() &&
                transactionDate.getMonth() === today.getMonth();
        });
    
    }


}