import { Transaction } from "src/app/models/Transaction";
import { TimeSelector } from "./time-selector";

export abstract class BaseSelector implements TimeSelector {

    public getBalance(transactions: Transaction[]): number {
        var number =  this.getTransactions(transactions).reduce((accumulator, transaction) => accumulator + transaction.amount, 0);
        return number;
    }
    public getSpent(transactions: Transaction[]): number {
        var number =  this.getExpenses(transactions).reduce((accumulator, transaction) =>  accumulator + transaction.amount, 0);
        return number;
    }

    public abstract getString(): string;

    public getTransactions(transactions: Transaction[]): Transaction[] {
        return this.getTransactionSortedByDate(this.getAbstractTransactions(transactions));
    }

    public abstract getAbstractTransactions(transactions: Transaction[]): Transaction[];

    public getExpenses(transactions: Transaction[]): Transaction[] {
        return this.getTransactions(transactions).filter(transaction => transaction.amount < 0);
    }

    public getIncome(transactions: Transaction[]): Transaction[] {
        return this.getTransactions(transactions).filter(transaction => transaction.amount > 0);
    }

    public getTransactionSortedByDate(transactions : Transaction[]) : Transaction[] {
        return transactions.sort((a, b) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

    }
}