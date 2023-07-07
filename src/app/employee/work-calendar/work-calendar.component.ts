import { Component, ElementRef, OnInit } from '@angular/core';
import { Calendar, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { PunchService } from '../shared/services/punch.service';
import { AuthService } from '../shared/authorization/auth.service';
import { WorkingTime } from '../shared/models/punch-models';

@Component({
  selector: 'app-work-calendar',
  templateUrl: './work-calendar.component.html',
  styleUrls: ['./work-calendar.component.css']
})
export class WorkCalendarComponent implements OnInit{
  userId!:any;
  workingTimes: WorkingTime[] = [];

  events = this.workingTimes.map((workingHour) => {
    return {
      title: 'Working Hours',
      date: workingHour.date,
    };
  });

  constructor(
    private punchService: PunchService,
    private authService: AuthService,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.GetWorkingHours();

    
  }


  ngAfterViewInit() {
    const calendarEl: HTMLElement = this.elementRef.nativeElement.querySelector('#calendar')!;
    const calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin],
      initialView: 'dayGridMonth',
      events: this.prepareEvents(), // Pass the events array here
    });
    calendar.render();
  }

  GetWorkingHours(){
    this.punchService.GetFiveDaysWorkingTime(this.userId).subscribe(
      (res) => {
        if(res.isSuccess){
          this.workingTimes = res.response;
          console.log(this.workingTimes);

          res.response.forEach(element => {
            this.workingTimes.push(element);
          });
        }
      }
    )
  }



  

  prepareEvents(): EventInput[] {
    // Assuming workingHours is an array of working hours fetched from the API
    const events: EventInput[] = this.workingTimes.map((workingHour) => {
      return {
        title: `Working Hours: ${workingHour.workingTime}`,
        start: workingHour.date,
      };
    });
    return events;
  }


}
