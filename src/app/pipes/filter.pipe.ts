import { Pipe, PipeTransform } from '@angular/core';
import { I_Employee } from '../Models/employee';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any, arg: string = 'name'): any {
    const respSearch = [];
    if (arg === '' || arg.length === 3) return value;

    for (const employee of value) {
      if (employee.name.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        // console.log('si');
        respSearch.push(employee);
      }
    }

    return respSearch;
  }
}
