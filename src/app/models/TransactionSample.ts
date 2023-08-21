import { Category } from "./Category";
import { Transaction } from "./Transaction";

export class TransactionSample {
    id?: number;
    name?: string;
    date: string = new Date().toISOString().substring(0, 10);
    amount?: number;
    description?: string;
    categories: Category[] = [];


    constructor() {
        
     }
    
     setTransaction(transaction : Transaction){
        this.id = transaction.id;
        this.name = transaction.name;
        this.date = transaction.date.substring(0, 10);
        this.amount = transaction.amount;
        this.description = transaction.description;
        this.categories = transaction.categories;

     }

    getTransaction() : Transaction {
        let transaction : Transaction = new Transaction();
        if(this.id){
            transaction.id = this.id;
        }
        transaction.name = this.name;
        transaction.date = this.date;
        transaction.amount = this.amount? this.amount : 0;
        transaction.description = this.description;
        transaction.categories = this.categories;
        return transaction;
    }

  }