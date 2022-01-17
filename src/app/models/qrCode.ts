import { Byte } from "@angular/compiler/src/util";

export interface qrCode{
    id:number,
    tableId:number,
    qrCodeImagePath:Byte[],
    routerLink:string
}