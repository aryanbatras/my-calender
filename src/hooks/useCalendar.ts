import { useState, useEffect, useCallback } from 'react';
import { format, isWithinInterval, isAfter, isBefore, isEqual } from 'date-fns';

interface NotesData {
  [key: string]: string;
}

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

export const useCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateRange, setDateRange] = useState<DateRange>({ startDate: null, endDate: null });
  const [isSelectingRange, setIsSelectingRange] = useState(false);
  const [notes, setNotes] = useState<NotesData>({});

  useEffect(() => {
    const savedNotes = localStorage.getItem('calendar-notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  const saveNote = useCallback((date: Date, value: string) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    setNotes((prev) => {
      const updated = { ...prev, [dateKey]: value };
      localStorage.setItem('calendar-notes', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const saveRangeNote = useCallback((startDate: Date, endDate: Date, value: string) => {
    const rangeKey = `${format(startDate, 'yyyy-MM-dd')}_to_${format(endDate, 'yyyy-MM-dd')}`;
    setNotes((prev) => {
      const updated = { ...prev, [rangeKey]: value };
      localStorage.setItem('calendar-notes', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const getNoteForDate = useCallback(
    (date: Date) => {
      const dateKey = format(date, 'yyyy-MM-dd');
      return notes[dateKey] || '';
    },
    [notes]
  );

  const getNoteForRange = useCallback(
    (startDate: Date, endDate: Date) => {
      const rangeKey = `${format(startDate, 'yyyy-MM-dd')}_to_${format(endDate, 'yyyy-MM-dd')}`;
      return notes[rangeKey] || '';
    },
    [notes]
  );

  const nextMonth = useCallback(() => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }, []);

  const prevMonth = useCallback(() => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }, []);

  const selectDate = useCallback((date: Date) => {
    if (!isSelectingRange) {
      setSelectedDate(date);
    } else {
      setDateRange((prev) => {
        if (!prev.startDate) {
          return { startDate: date, endDate: null };
        } else if (!prev.endDate) {
          if (isBefore(date, prev.startDate)) {
            return { startDate: date, endDate: prev.startDate };
          } else {
            return { startDate: prev.startDate, endDate: date };
          }
        } else {
          return { startDate: date, endDate: null };
        }
      });
    }
  }, [isSelectingRange]);

  const toggleRangeMode = useCallback(() => {
    setIsSelectingRange((prev) => !prev);
    if (isSelectingRange) {
      setDateRange({ startDate: null, endDate: null });
    }
  }, [isSelectingRange]);

  const clearRange = useCallback(() => {
    setDateRange({ startDate: null, endDate: null });
  }, []);

  const isDateInRange = useCallback((date: Date) => {
    if (!dateRange.startDate || !dateRange.endDate) return false;
    return isWithinInterval(date, { start: dateRange.startDate, end: dateRange.endDate });
  }, [dateRange]);

  const isDateStart = useCallback((date: Date) => {
    return dateRange.startDate ? isEqual(date, dateRange.startDate) : false;
  }, [dateRange.startDate]);

  const isDateEnd = useCallback((date: Date) => {
    return dateRange.endDate ? isEqual(date, dateRange.endDate) : false;
  }, [dateRange.endDate]);

  return {
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
  };
};
