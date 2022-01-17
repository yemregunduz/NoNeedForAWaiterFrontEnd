import { Byte } from "@angular/compiler/src/util";

export interface qrCodeTableDto{
    id:number,
    tableId:number,
    qrCodeImagePath:Byte[]
    routerLink:string,
    restaurantId:number,
    tableNo:number
}