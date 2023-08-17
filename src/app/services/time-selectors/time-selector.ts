import { Transaction } from "src/app/models/Transaction";

export interface TimeSelector {

    getSpent( transactions : Transaction[]) : number;
    getBalance( transactions : Transaction[]) : number;
    getString() : string;
    getTransactions( transactions : Transaction[]) : Transaction[];
    getExpenses( transactions : Transaction[]) : Transaction[];
    getIncome( transactions : Transaction[]) : Transaction[];

}