import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'productFilterPipe'
})
export class ProductFilterPipePipe implements PipeTransform {

  transform(value: Product[], filterText: string): any[] {
    filterText = filterText? filterText.toLocaleLowerCase():""
    return filterText?value.filter((p:Product)=>p.productName.toLocaleLowerCase().indexOf(filterText)!==-1
    || p.unitPrice.toString().toLocaleLowerCase().indexOf(filterText)!==-1
    || p.stock.toString().toLocaleLowerCase().indexOf(filterText)!==-1
    || p.categoryName.toLocaleLowerCase().indexOf(filterText) !== -1 
    ):value;
  }

}
