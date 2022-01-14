export interface OrderTableDto{
    orderId:number,
    tableId:number,
    restaurantId:number,
    tableNo:number,
    orderDate:Date,
    orderAmount:number,
    orderStatus:boolean,
    restaurantName:string
}