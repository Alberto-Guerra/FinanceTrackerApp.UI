import { Component, EventEmitter, Output } from '@angular/core';
import { DaySelector } from 'src/app/services/time-selectors/day-selector';
import { MonthSelector } from 'src/app/services/time-selectors/month-selector';
import { TimeSelector } from 'src/app/services/time-selectors/time-selector';
import { WeekSelector } from 'src/app/services/time-selectors/week-selector';

@Component({
  selector: 'app-time-selector',
  templateUrl: './time-selector.component.html',
  styleUrls: ['./time-selector.component.css']
})
export class TimeSelectorComponent {

  @Output() selectorChanged = new EventEmitter<TimeSelector>();

  returnDaySelector() {
    this.selectorChanged.emit(new DaySelector());
  }

  returnWeekSelector() {
    this.selectorChanged.emit(new WeekSelector());
  }

  returnMonthSelector() {
    this.selectorChanged.emit(new MonthSelector());
  }


}
