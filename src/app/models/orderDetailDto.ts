export interface OrderDetailDto{
    orderDetailId:number,
    orderId:number,
    productId:number,
    restaurantId:number,
    categoryId:number,
    quantity:number,
    lineTotal:number,
    tableId:number,
    orderStatus:number,
    stock:number,
    productName:string,
    productDescription:string,
    productImagePath:string,
    unitPrice:number
}