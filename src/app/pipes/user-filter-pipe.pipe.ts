import { Pipe, PipeTransform } from '@angular/core';
import { UserDetailDto } from '../models/userDetailDto';

@Pipe({
  name: 'userFilterPipe'
})
export class UserFilterPipePipe implements PipeTransform {

  transform(value: UserDetailDto[], filterText: string): any[] {
    filterText = filterText? filterText.toLocaleLowerCase():""
    return filterText?value.filter((u:UserDetailDto)=>u.firstName.toLocaleLowerCase().indexOf(filterText)!==-1
    || u.lastName.toLocaleLowerCase().indexOf(filterText)!==-1
    || u.title.toLocaleLowerCase().indexOf(filterText)!==-1
    || u.email.toLocaleLowerCase().indexOf(filterText)!==-1
    ):value;
  }

}
