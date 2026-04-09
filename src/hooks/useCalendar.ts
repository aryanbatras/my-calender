import { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';

interface NotesData {
  [key: string]: string;
}

export const useCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
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

  const getNoteForDate = useCallback(
    (date: Date) => {
      const dateKey = format(date, 'yyyy-MM-dd');
      return notes[dateKey] || '';
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
    setSelectedDate(date);
  }, []);

  return {
    currentMonth,
    selectedDate,
    notes,
    saveNote,
    getNoteForDate,
    nextMonth,
    prevMonth,
    selectDate,
  };
};
