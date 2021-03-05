import { Options } from "../enum/options.enum";

export class PortfolioDailyReturn {
    positionDate: string;
    eodMv: number;
    eodInv: number;
    unrealized: number;
    sodMv: number;
    sodInv: number;
    realized: number;
    cumuRealizedPnl: number;
    cumuUnrealizedPnl: number;
    dayTrade: number;
    cumuDayTrade: number;
    onh: number;
    cumuOnh: number;
    sideBet: number;
    cumuSideBet: number;
    swing: number;
    cumuSwing: number;
    other: number;
    cumuOther: number;
    realizedP: number;

    // public static getElementArray(data: PortfolioDailyReturn[], element: number): any[] {
    //     return data.map(e => {
    //         if (element === Options.realized) { e.realized }
    //         else if (element === Options.onh) { e.onh }
    //         else if (element === Options.swing) { e.swing }
    //         else if (element === Options.sideBet) { e.sideBet }
    //         else if (element === Options.dayTrade) { e.dayTrade }
    //         else if (element === Options.other) { e.other }
    //         else if (element === Options.unrealized) { e.unrealized }
    //         else if (element === Options.sodInv) { e.sodInv }
    //         else if (element === Options.cumuRealizedPnl) { e.cumuRealizedPnl }
    //         else { e.realized }
    //        });
    // }
}