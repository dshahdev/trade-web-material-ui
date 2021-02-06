import { PnlTrade } from "./pnl-trad.model";

export class PNLTickerDetail {

    ticker: string;
    pnl: number;
    pnlList: Array<PnlTrade>;
}