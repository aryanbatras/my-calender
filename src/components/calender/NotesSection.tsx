import { useCallback } from "react";
import { format } from "date-fns";
import styles from "@/styles/NotesSection.module.css";

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

interface NotesSectionProps {
  selectedDate: Date;
  dateRange: DateRange;
  isSelectingRange: boolean;
  notes: { [key: string]: string };
  saveNote: (date: Date, value: string) => void;
  saveRangeNote: (startDate: Date, endDate: Date, value: string) => void;
  getNoteForRange: (startDate: Date, endDate: Date) => string;
}

export default function NotesSection({ 
  selectedDate, 
  dateRange, 
  isSelectingRange, 
  notes, 
  saveNote, 
  saveRangeNote, 
  getNoteForRange 
}: NotesSectionProps) {
  const getNoteForDate = useCallback(
    (date: Date) => {
      const dateKey = format(date, 'yyyy-MM-dd');
      return notes[dateKey] || "";
    },
    [notes]
  );

  const getCurrentNote = useCallback(() => {
    if (isSelectingRange && dateRange.startDate && dateRange.endDate) {
      return getNoteForRange(dateRange.startDate, dateRange.endDate);
    } else {
      return getNoteForDate(selectedDate);
    }
  }, [isSelectingRange, dateRange, selectedDate, getNoteForDate, getNoteForRange]);

  const currentNote = getCurrentNote();

  const handleNoteChange = (lineIndex: number, value: string) => {
    const lines = currentNote.split("\n");
    lines[lineIndex] = value;
    const updatedNote = lines.join("\n");
    
    if (isSelectingRange && dateRange.startDate && dateRange.endDate) {
      saveRangeNote(dateRange.startDate, dateRange.endDate, updatedNote);
    } else {
      saveNote(selectedDate, updatedNote);
    }
  };

  const getNotesLabel = () => {
    if (isSelectingRange && dateRange.startDate && dateRange.endDate) {
      return `Notes: ${format(dateRange.startDate, 'MMM d')} - ${format(dateRange.endDate, 'MMM d')}`;
    } else if (isSelectingRange && dateRange.startDate && !dateRange.endDate) {
      return 'Notes: Select end date';
    } else {
      return `Notes: ${format(selectedDate, 'MMM d, yyyy')}`;
    }
  };

  return (
    <div className={styles.notesSection}>
      <div className={styles.notesLabel}>{getNotesLabel()}</div>
      <div className={styles.notesLines}>
        {[0, 1, 2, 3, 4, 5, 6].map((lineIndex) => (
          <input
            key={lineIndex}
            type="text"
            className={styles.noteLine}
            value={currentNote.split("\n")[lineIndex] || ""}
            onChange={(e) => handleNoteChange(lineIndex, e.target.value)}
            placeholder=""
            disabled={isSelectingRange && !dateRange.startDate}
          />
        ))}
      </div>
    </div>
  );
}
