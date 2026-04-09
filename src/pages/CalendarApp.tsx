import React from 'react';
import styles from '@/styles/Calendar.module.css';
import SpiralBinding from '@/components/calender/SpiralBinding';
import SpiralBlackOverlay from '@/components/calender/SpiralBlackOverlay';
import SpiralWhiteOverlay from '@/components/calender/SpiralWhiteOverlay';
import ImageContainer from '@/components/calender/ImageContainer';
import NotesSection from '@/components/calender/NotesSection';
import CalendarView from '@/components/calender/CalendarView';
import { useCalendar } from '@/hooks/useCalendar';

export default function CalendarApp() {
  const {
    currentMonth,
    selectedDate,
    dateRange,
    isSelectingRange,
    notes,
    saveNote,
    saveRangeNote,
    getNoteForDate,
    getNoteForRange,
    nextMonth,
    prevMonth,
    selectDate,
    toggleRangeMode,
    clearRange,
    setCurrentMonth,
    isDateInRange,
    isDateStart,
    isDateEnd,
  } = useCalendar();

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendarPaper}>
        
        <div className={styles.spiralContainer}>
          <SpiralWhiteOverlay />
          <SpiralBlackOverlay />
          <SpiralBinding />
        </div>

        <ImageContainer />

        <div className={styles.contentSection}>
          <NotesSection 
            selectedDate={selectedDate}
            dateRange={dateRange}
            isSelectingRange={isSelectingRange}
            notes={notes}
            saveNote={saveNote}
            saveRangeNote={saveRangeNote}
            getNoteForRange={getNoteForRange}
          />
          <CalendarView 
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            dateRange={dateRange}
            isSelectingRange={isSelectingRange}
            onMonthChange={(month) => setCurrentMonth(month)}
            onDateClick={selectDate}
            isDateInRange={isDateInRange}
            isDateStart={isDateStart}
            isDateEnd={isDateEnd}
            toggleRangeMode={toggleRangeMode}
            clearRange={clearRange}
          />
        </div>
      </div>
    </div>
  );
}
