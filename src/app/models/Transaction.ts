import { Category } from "./Category";

export class Transaction {

    id?: number;
    name?: string;
    amount: number = 0;
    date: string = new Date().toISOString();
    categories: Category[] = [];
    description?: string;

}