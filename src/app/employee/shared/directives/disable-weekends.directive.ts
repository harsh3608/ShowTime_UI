import { Directive, ElementRef, HostListener } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Directive({
  selector: '[appDisableWeekends]'
})
export class DisableWeekendsDirective {
  constructor(
    private el: ElementRef,
    private toastr: ToastrService
    ) {}

  @HostListener('input', ['$event']) onInput(event: Event) {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    const selectedDate = new Date(inputElement.value);
    const dayOfWeek = selectedDate.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      // Disable weekends
      inputElement.value = ''; // Clear the input value if it's a weekend
      this.toastr.warning('Leave could not be requested on Weekend days','Warning',{ timeOut:2000})
    }
  }
}

