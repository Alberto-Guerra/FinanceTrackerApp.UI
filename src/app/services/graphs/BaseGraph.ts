import { Graph } from "../graph-service.service";

export abstract class BaseGraph implements Graph{

    

    options: any;

    getOptions(): any {
        return this.options;
    }

    constructor() {
        this.options = this.calculateOptions();
    }
    name: string = "base"

    abstract calculateOptions(): any;
}