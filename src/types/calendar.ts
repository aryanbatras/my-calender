export interface NotesData {
  [key: string]: string;
}

export interface CalendarState {
  currentMonth: Date;
  selectedDate: Date;
  notes: NotesData;
}

export interface CalendarActions {
  setCurrentMonth: (date: Date) => void;
  setSelectedDate: (date: Date) => void;
  setNotes: (notes: NotesData) => void;
}

export interface CalendarHandlers {
  saveNote: (date: Date, value: string) => void;
  getNoteForDate: (date: Date) => string;
  nextMonth: () => void;
  prevMonth: () => void;
  selectDate: (date: Date) => void;
}

export interface CalendarViewProps {
  currentMonth: Date;
  selectedDate: Date;
  onMonthChange: (month: Date) => void;
  onDateClick: (date: Date) => void;
}

export interface NotesSectionProps {
  selectedDate: Date;
  notes: NotesData;
  saveNote: (date: Date, value: string) => void;
}

export interface ImageContainerProps {
  // ImageContainer doesn't need any props currently
}
