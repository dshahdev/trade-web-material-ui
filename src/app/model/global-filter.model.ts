import { Period } from "./period.model";


export class GlobalFilter {
    
    public ticker: Array<string>;
    public period: Period;
    public realized: Array<string>;
    public strategy: Array<string>;
    public tradeId: Array<string>;
}