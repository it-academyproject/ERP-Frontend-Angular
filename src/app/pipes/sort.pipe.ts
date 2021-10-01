import { Pipe, PipeTransform } from '@angular/core';
import { I_Employee } from '../Models/employee';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(employees: I_Employee[], order: string = 'name'): I_Employee[] {
    switch (order) {
      case 'id':
        return (employees = employees.sort((a, b) => (a.id > b.id ? 1 : -1)));
      case 'name':
        return (employees = employees.sort((a, b) =>
          a.name > b.name ? 1 : -1
        ));
      case 'total-sellings':
        return (employees = employees.sort((a, b) =>
          a.totalSellings > b.totalSellings ? 1 : -1
        ));
      case 'orders-attended':
        return (employees = employees.sort((a, b) =>
          a.ordersAttended > b.ordersAttended ? 1 : -1
        ));

      default:
        return employees;
    }
  }
}
