import { Transaction } from "./Transaction";


export class Category {

    id?: number;
    name: string = "";
    description: string = "";
    transactions: Transaction[] = [];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

}