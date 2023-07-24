import { Component, ElementRef, OnInit } from '@angular/core';
import { Calendar, EventInput } from '@fullcalendar/core'; 
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-self-leave-calendar',
  templateUrl: './self-leave-calendar.component.html',
  styleUrls: ['./self-leave-calendar.component.css']
})
export class SelfLeaveCalendarComponent implements OnInit{
  isLoading: boolean = true;
  customEvents : EventInput[] = [];

  constructor(
    private elementRef: ElementRef
  ){}

  ngOnInit(): void {
    setTimeout(() => {
      this.CreateCustomEvents();
      this.isLoading = false;
    }, 1500);

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

  CreateCustomEvents(){

  }

}
