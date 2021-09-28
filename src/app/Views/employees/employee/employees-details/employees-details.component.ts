import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees-details',
  templateUrl: './employees-details.component.html',
  styleUrls: ['./employees-details.component.scss'],
})
export class EmployeesDetailsComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  goWorkingHours() {
    this.router.navigateByUrl('working-hours');
  }
}
