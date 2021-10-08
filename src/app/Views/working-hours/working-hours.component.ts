import { WorkingHours } from './../../Models/workingHours';
import { Component, Input, OnInit } from '@angular/core';
import { WorkingHoursService } from '../../Services/workingHours.service';
import { I_Employee } from '../../Models/employee';
import { EmployeesService } from 'src/app/Services/employees.service';

@Component({
  selector: 'app-working-hours',
  templateUrl: './working-hours.component.html',
  styleUrls: ['./working-hours.component.scss'],
})
// let check_out = new Date();
// let check_in = new Date(check_out.getTime() + 1000 * 60 * 60 * 24);
export class WorkingHoursComponent implements OnInit {
  public get workingHoursService(): WorkingHoursService {
    return this._workingHoursService;
  }
  public set workingHoursService(value: WorkingHoursService) {
    this._workingHoursService = value;
  }
  WorkingHours: any[];
  employees: any[];

  @Input() nameEmployee: String;

  constructor(
    private _workingHoursService: WorkingHoursService,
    public employeesService: EmployeesService
  ) {}

  ngOnInit(): void {
    this.workingHoursService.getAllWorkingHours().subscribe((resp: any) => {
      this.WorkingHours = resp.working_hours;
      // console.log(resp.working_hours);
    });
  }

  // NameEmployee() {
  //   this.employeesService.nameEmployee = this.employees;
  // }
}
