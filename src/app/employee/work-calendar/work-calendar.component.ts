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
  customEvents: EventInput[] = [];
  isLoading: boolean = true;


  constructor(
    private punchService: PunchService,
    private authService: AuthService,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.GetWorkingHours();
    
    setTimeout(() => {
      this.CreateCustomEvents();
      this.isLoading = false;
    }, 1000);

    setTimeout(() => {
      const calendarEl: HTMLElement = this.elementRef.nativeElement.querySelector('#calendar')!;
    const calendar = new Calendar(calendarEl, {
      plugins: [dayGridPlugin],
      initialView: 'dayGridMonth',
      events: this.customEvents, // Pass the events array here
    });
    calendar.render();
    }, 1500);
    
  }

  CreateCustomEvents() {
    this.workingTimes.forEach(element => {

      let event = { 
        title: this.SetTitle(element.workingTime), 
        date: element.date.split('T')[0] ,
        color: this.SetColor(element.workingTime)
      }

      this.customEvents.push(event);

    });
    
  }

  SetTitle(time: number) {
    if(time < 0.10){
      return 'Day-Off';
    }else{
      return `${time.toFixed(2)} hrs`
    }
  }

  SetColor(time: number){
    if(time < 0.10){
      return 'orange';
    }else{
      return 'green'
    }
  }

  GetWorkingHours(){
    this.punchService.GetAllDaysWorkingTime(this.userId).subscribe(
      (res) => {
        if(res.isSuccess){
          this.workingTimes = res.response;
        }
      }
    );
    
  }



  



}
