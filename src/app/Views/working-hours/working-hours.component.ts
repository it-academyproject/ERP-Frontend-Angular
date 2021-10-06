import { WorkingHours } from './../../Models/workingHours';
import { Component, OnInit, Input } from '@angular/core';
import { WorkingHoursService } from '../../Services/workingHours.service';
import { ValuesPipe } from 'src/app/pipes/values.pipe';


@Component({
  selector: 'app-working-hours',
  templateUrl: './working-hours.component.html',
  styleUrls: ['./working-hours.component.scss'],
})
  // let check_out = new Date();
  // let check_in = new Date(check_out.getTime() + 1000 * 60 * 60 * 24);

export class WorkingHoursComponent implements OnInit {
  // @Input()  name. 'Cristina';
  WorkingHours: any[];
  

  constructor(public workingHoursService: WorkingHoursService) {
    
  }

  ngOnInit(): void {
    this.workingHoursService.getAllWorkingHours().subscribe((resp: any) => {
      this.WorkingHours = resp.working_hours;
      console.log(resp.working_hours);
    });
  }
  totalHours( ){

  // let diferencia = check_out.getTime() - check_in.getTime();
  // let horasTranscurridas = diferencia / 1000 / 60 / 60;
  // console.log(horasTranscurridas);
  
}
}
