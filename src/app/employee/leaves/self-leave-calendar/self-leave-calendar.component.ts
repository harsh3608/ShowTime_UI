import { Component, ElementRef, OnInit } from '@angular/core';
import { Calendar, EventInput } from '@fullcalendar/core'; 
import dayGridPlugin from '@fullcalendar/daygrid';
import { LeaveService } from '../../shared/services/leave.service';
import { AuthService } from '../../shared/authorization/auth.service';
import { LeaveDTO } from '../../shared/models/leave-models';
import { ToastrService } from 'ngx-toastr';
import { LeaveTypeOptions } from '../../shared/enums/leave-enums';
import { LeaveDetailsComponent } from '../leave-details/leave-details.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-self-leave-calendar',
  templateUrl: './self-leave-calendar.component.html',
  styleUrls: ['./self-leave-calendar.component.css']
})
export class SelfLeaveCalendarComponent implements OnInit{
  isLoading: boolean = true;
  customEvents : EventInput[] = [];
  userId!: any;
  selfLeaves: LeaveDTO[] = [];
  leaveTypeOptions: string[] = [] ;


  constructor(
    private elementRef: ElementRef,
    private leaveService: LeaveService,
    private authService: AuthService,
    private toastr: ToastrService,
    private dialog: MatDialog,
  ){}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.GetSelfLeaves();

    this.leaveTypeOptions = Object.keys(LeaveTypeOptions)
    .filter(key => isNaN(Number(key))) // Exclude numeric keys, if any
    .map(key => LeaveTypeOptions[key as keyof typeof LeaveTypeOptions]);

    setTimeout(() => {
      this.CreateCustomEvents();
      this.isLoading = false;
    }, 1500);

    this.InitiateCalendar();
  }

  InitiateCalendar(){
    setTimeout(() => {
      const calendarEl: HTMLElement = this.elementRef.nativeElement.querySelector('#calendar')!;
      const calendar = new Calendar(calendarEl, {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        events: this.customEvents,        // Pass the events array here
        eventClick: this.HandleEventClick.bind(this),    // Add the eventClick callback here
        //weekends: false,

      });
      calendar.render();
    }, 1500);
  }

  HandleEventClick(eventInfo: any) {
  const event = eventInfo.event;
  const eventId = event.extendedProps.id;

  const dialogRef = this.dialog.open(LeaveDetailsComponent,
    {
      data: { leaveId: eventId }
    }
  );
  dialogRef.afterClosed().subscribe(result => {
    this.dialog.closeAll();
  });
  }

  CreateCustomEvents(){
    this.selfLeaves.forEach(element => {

      let leaveDates = this.GetDatesInRange(element.startDate, element.endDate);

      leaveDates.forEach(date=> {
        let event = {
          title: `${this.leaveTypeOptions[element.leaveType]}`,
          date: date,
          extendedProps: {
            id: element.id // Add the 'id' property to the event's extendedProps
          },
          color: this.GetEventColor(element.leaveType)
        };
        this.customEvents.push(event);
      });

    })
  }

  GetSelfLeaves(){
    this.leaveService.GetUserAllLeaves(this.userId).subscribe(
      (res)=>{
        if(res.isSuccess){
          this.selfLeaves = res.response;
          
        }else[
          this.toastr.warning(res.message,'Failure',{
            timeOut:2000
          })
        ]
      }
    )
  }

  GetDatesInRange(startDate: any, endDate: any) {
    const dates = [];
  const currentDate = new Date(startDate);
  const end = new Date(endDate);

  while (currentDate <= end) {
    dates.push(this.FormatDate(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
  }

  FormatDate(date: any) {
    // Helper function to add leading zero
    const addLeadingZero = (value: number) => (value < 10 ? `0${value}` : value);
  
    const year = date.getFullYear();
    const month = addLeadingZero(date.getMonth() + 1);
    const day = addLeadingZero(date.getDate());
  
    return `${year}-${month}-${day}`;
  }

  GetEventColor(leaveType: number) {
    switch (leaveType) {
      case 0:
        return 'green';
        case 1:
          return 'violet';
        case 2:
        return 'yellow';
        case 3:
        return 'red';
        case 4:
        return 'blue';
      default:
        return 'gray';
    }
  }


}
