import { Transaction } from "src/app/models/Transaction";
import { TimeSelector } from "./time-selector";
import { BaseSelector } from "./base-selector";

export class WeekSelector extends BaseSelector {


    public getString(): string {
        return "this Week";
    }

    public getAbstractTransactions(transactions: Transaction[]): Transaction[] {
        return transactions.filter(transaction => {
            const transactionDate = new Date(transaction.date?.split('T')[0] + "T00:00:00");
            const today = new Date();
            return transactionDate.getFullYear() === today.getFullYear() &&
                this.getWeekNumber(transactionDate) === this.getWeekNumber(today);
        });
    
    }

    private getWeekNumber(date: Date): number {
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000; // 1000ms*60s*60m*24h = 86400000ms
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    }

}