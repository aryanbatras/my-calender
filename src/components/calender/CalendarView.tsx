import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isWeekend,
} from "date-fns";
import styles from "@/styles/CalendarView.module.css";

interface CalendarViewProps {
  currentMonth: Date;
  selectedDate: Date;
  dateRange: { startDate: Date | null; endDate: Date | null };
  isSelectingRange: boolean;
  onMonthChange: (month: Date) => void;
  onDateClick: (date: Date) => void;
  isDateInRange: (date: Date) => boolean;
  isDateStart: (date: Date) => boolean;
  isDateEnd: (date: Date) => boolean;
  toggleRangeMode: () => void;
  clearRange: () => void;
}

export default function CalendarView({ 
  currentMonth, 
  selectedDate, 
  dateRange, 
  isSelectingRange, 
  onMonthChange, 
  onDateClick, 
  isDateInRange, 
  isDateStart, 
  isDateEnd, 
  toggleRangeMode, 
  clearRange 
}: CalendarViewProps) {
  const nextMonth = () => onMonthChange(addMonths(currentMonth, 1));
  const prevMonth = () => onMonthChange(subMonths(currentMonth, 1));

  const renderHeader = () => {
    const monthYear = format(currentMonth, "yyyy MMMM");
    const [year, month] = monthYear.split(" ");
    
    return (
      <div className={styles.calendarHeader}>
        <button className={styles.navButton} onClick={prevMonth}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className={styles.monthYearDisplay}>
          <div className={styles.year}>{year}</div>
          <div className={styles.month}>{month.toUpperCase()}</div>
        </div>
        <button className={styles.navButton} onClick={nextMonth}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return (
      <div className={styles.weekdayHeader}>
        {weekDays.map((day, index) => (
          <div
            key={day}
            className={`${styles.weekday} ${
              index >= 5 ? styles.weekend : ""
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    return (
      <div className={styles.daysGrid}>
        {days.map((day) => {
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isSelected = isSameDay(day, selectedDate);
          const isWeekendDay = isWeekend(day);
          const inRange = isDateInRange(day);
          const isStart = isDateStart(day);
          const isEnd = isDateEnd(day);

          let dayClass = styles.dayCell;
          if (isCurrentMonth) {
            dayClass += ` ${styles.currentMonth}`;
            if (isWeekendDay) {
              dayClass += ` ${styles.weekendDay}`;
            }
          } else {
            dayClass += ` ${styles.otherMonth}`;
          }
          
          if (isSelectingRange) {
            if (isStart) {
              dayClass += ` ${styles.rangeStart}`;
            } else if (isEnd) {
              dayClass += ` ${styles.rangeEnd}`;
            } else if (inRange) {
              dayClass += ` ${styles.rangeMiddle}`;
            }
          } else if (isSelected) {
            dayClass += ` ${styles.selected}`;
          }

          return (
            <div
              key={day.toString()}
              className={dayClass}
              onClick={() => onDateClick(day)}
            >
              <span className={styles.dayNumber}>{format(day, "d")}</span>
            </div>
          );
        })}
      </div>
    );
  };

  const renderRangeControls = () => {
    return (
      <div className={styles.rangeControls}>
        <button 
          className={`${styles.rangeModeButton} ${isSelectingRange ? styles.active : ''}`}
          onClick={toggleRangeMode}
        >
          {isSelectingRange ? 'Range Selection' : 'Single Date'}
        </button>
        {isSelectingRange && dateRange.startDate && dateRange.endDate && (
          <button className={styles.clearRangeButton} onClick={clearRange}>
            Clear Range
          </button>
        )}
        {isSelectingRange && dateRange.startDate && !dateRange.endDate && (
          <span className={styles.rangeHint}>Select end date</span>
        )}
      </div>
    );
  };

  return (
    <div className={styles.calendarSection}>
      {renderRangeControls()}
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
}
