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
    notes,
    saveNote,
    getNoteForDate,
    nextMonth,
    prevMonth,
    selectDate,
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
            notes={notes}
            saveNote={saveNote}
          />
          <CalendarView 
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            onMonthChange={nextMonth}
            onDateClick={selectDate}
          />
        </div>
      </div>
    </div>
  );
}
