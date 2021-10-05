import { I_Employee } from './../../../Models/employee';
import { Component, OnInit } from '@angular/core';
import {
  faTrashAlt,
  faEdit,
  faCalendarAlt,
} from '@fortawesome/free-regular-svg-icons';
import { ActivationEnd, Router } from '@angular/router';
import { EmployeesService } from '../../../Services/employees.service';
import { ActionSequence } from 'selenium-webdriver';
import { faSort } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss'],
})
export class EmployeesListComponent implements OnInit {
  //Icons
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  faCalendarAlt = faCalendarAlt;
  faSort = faSort;
  employees: any[];
  currentPage: number;
  totalPages: number;
  pageToGo: number;
  pagesArray: Array<number>;
  order: string = '';
  term: string = '';
  errorAPI: boolean = false;
  in_date: number;

  constructor(
    private employeesService: EmployeesService,
    private router: Router
  ) {
    this.currentPage = 1;
  }

  ngOnInit(): void {
    this.goToPage(this.currentPage);

    this.employeesService.getAllEmployees().subscribe((resp) => {
      // this.employees = resp.employees;
      console.log(resp.employees);
    });
  }

  //Función para que se abra la página de single Employee
  goEditEmployee(id: string) {
    this.router.navigate(['/employee', id]);
  }
  //Funcion para que se abr la página Working-hours
  goWorkingHours() {
    this.router.navigateByUrl('working-hours');
  }
  isLastPage() {
    return this.currentPage == this.totalPages;
  }

  isFirstPage() {
    return this.currentPage == 1;
  }

  gotoNextPage(): boolean {
    let _pageNumber = this.currentPage + 1;
    if (_pageNumber > this.totalPages) {
      _pageNumber = this.totalPages;
    }
    this.goToPage(_pageNumber);

    return false;
  }
  gotoPrevPage(): boolean {
    let _pageNumber = this.currentPage - 1;
    if (_pageNumber < 1) {
      _pageNumber = 1;
    }
    this.goToPage(_pageNumber);

    return false;
  }

  goToPage(pageNumber: number): boolean {
    if (pageNumber > this.totalPages) {
      pageNumber = this.totalPages;
    }
    this.pagesArray = new Array();
    // TODO: 26/03/2021
    // The API does not implement employee paging, so for now, we get them all
    //show all employee list
    this.employeesService.getAllEmployees().subscribe((resp) => {
      this.employees = resp.employees;
    }),
      (err) => {
        console.log(err);
      };

    /*this.employeesService.getAllEmployees()
      .subscribe((data: any) => {


        this.currentPage = pageNumber;
        this.employees = data.employee;
        // this.totalPages = this.getTotalPages(data.totalEmployees, this.employeesService.employeesPerPage);
        this.totalPages = 1;
        this.setupArrayOfPages();
        this.pageToGo = null;
      }, (err) => {
        console.log(err);
      });
      */

    // Scafolding for Employees Pagination (same as did in Clients Pagination)
    //
    // this.employeesService.getEmployees(this.employeesService.employeesPerPage, pageNumber - 1) // -1 proque el paginador empieza en la página 0
    // .subscribe((data: any) => {
    //   this.currentPage = pageNumber;
    //   this.employees = data.EmployeesOfThePage;
    //   this.totalPages = this.getTotalPages(data.totalEmployees, this.employeesService.employeesPerPage);
    //   this.setupArrayOfPages();
    //   this.pageToGo = null;
    // }, (err) => {
    //   console.log(err);
    // });
    return false;
  }

  getTotalPages(totalRecords: number, recordsPerPage: number): number {
    let _totalPages = 0;
    if (recordsPerPage > 0) {
      _totalPages = Math.ceil(totalRecords / recordsPerPage);
    }
    return _totalPages;
  }

  //function to return array of pages
  setupArrayOfPages() {
    this.pagesArray = new Array();
    if (this.totalPages > 0) {
      this.pagesArray = Array(this.totalPages - 1);
      for (let i = 0; i < this.totalPages; i++) {
        this.pagesArray[i] = i + 1;
      }
    }
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }
  delete(i: number) {
    const id = this.employees[i].id;
    this.employeesService.deleteEmployee(id).subscribe();
    this.employees.splice(i, 1);
  }
  //Función para Buscar Empleado por Id // aquí añado un pipe.map para devolver otro array

  search() {
    this.errorAPI = false;
    this.employeesService.searchTerm(this.term).subscribe(
      (resp) => {
        console.log('resp', resp);
        // this.employees.filter((employees) => {
        //   return;
        // });
      },
      (err) => {
        this.errorAPI = true;
        console.log(err);
      }
    );
  }

  //Funcion para ordenar la lista

  orderBy(valor: string) {
    this.order = valor;
    console.log(valor);
  }

  onChecked(obj: any, isChecked: boolean) {
    console.log(obj, isChecked); // {}true || false
  }
}
