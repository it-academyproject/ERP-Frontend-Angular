import { WorkingHours } from './../../Models/workingHours';
import { Component, OnInit } from '@angular/core';
import { WorkingHoursService } from '../../Services/workingHours.service';
import { ValuesPipe } from 'src/app/pipes/values.pipe';

@Component({
  selector: 'app-working-hours',
  templateUrl: './working-hours.component.html',
  styleUrls: ['./working-hours.component.scss'],
})
export class WorkingHoursComponent implements OnInit {
  WorkingHours: any[];

  constructor(private workingHoursService: WorkingHoursService) {}

  ngOnInit(): void {
    this.workingHoursService.getAllWorkingHours().subscribe((resp: any) => {
      this.WorkingHours = resp.object;
      console.log('resp', resp);
    });
  }
}
