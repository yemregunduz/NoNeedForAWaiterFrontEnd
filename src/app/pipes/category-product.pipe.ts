import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'categoryProduct'
})
export class CategoryProductPipe implements PipeTransform {

  transform(value: Product[],categoryId:number): Product[] {
      return value.filter((p:Product)=>p.categoryId == categoryId)
  }

}
