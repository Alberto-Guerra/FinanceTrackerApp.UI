import { Component, EventEmitter, Output } from '@angular/core';
import { CustomSelector } from 'src/app/services/time-selectors/custom-selector';
import { DaySelector } from 'src/app/services/time-selectors/day-selector';
import { MonthSelector } from 'src/app/services/time-selectors/month-selector';
import { TimeSelector } from 'src/app/services/time-selectors/time-selector';
import { WeekSelector } from 'src/app/services/time-selectors/week-selector';
import { faIcons, faSliders, faArrowLeft, faFilter} from '@fortawesome/free-solid-svg-icons';
import { icon } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-time-selector',
  templateUrl: './time-selector.component.html',
  styleUrls: ['./time-selector.component.css']
})
export class TimeSelectorComponent {

  @Output() selectorChanged = new EventEmitter<TimeSelector>();

  custom : boolean = false;

  faSliders = faSliders;
  faArrowLeft = faArrowLeft;
  faFilter = faFilter;

  startDate? : Date = undefined;
  endDate? : Date = undefined;

  returnDaySelector() {
    this.selectorChanged.emit(new DaySelector());
  }

  returnWeekSelector() {
    this.selectorChanged.emit(new WeekSelector());
  }

  returnMonthSelector() {
    this.selectorChanged.emit(new MonthSelector());
  }

  customSelector() {

    if(this.startDate == null || this.endDate == null){
      alert("Please select a start and end date");
      return;
    }
    if(this.endDate < this.startDate){
      alert("End date must be after start date");
      return;
    }

    var startDate = new Date(this.startDate);
    console.log({startDate});

    var endDate = new Date(this.endDate);
    console.log({endDate});

    this.selectorChanged.emit(new CustomSelector(startDate,endDate));
  }




  toggleCustom() {
    this.custom = !this.custom;
  }



}
