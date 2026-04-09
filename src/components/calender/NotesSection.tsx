import { useCallback } from "react";
import { format } from "date-fns";
import styles from "@/styles/NotesSection.module.css";

interface NotesSectionProps {
  selectedDate: Date;
  notes: { [key: string]: string };
  saveNote: (date: Date, value: string) => void;
}

export default function NotesSection({ selectedDate, notes, saveNote }: NotesSectionProps) {
  const getNoteForDate = useCallback(
    (date: Date) => {
      const dateKey = format(date, "yyyy-MM-dd");
      return notes[dateKey] || "";
    },
    [notes]
  );

  const currentNote = getNoteForDate(selectedDate);

  const handleNoteChange = (lineIndex: number, value: string) => {
    const lines = currentNote.split("\n");
    lines[lineIndex] = value;
    saveNote(selectedDate, lines.join("\n"));
  };

  return (
    <div className={styles.notesSection}>
      <div className={styles.notesLabel}>Notes</div>
      <div className={styles.notesLines}>
        {[0, 1, 2, 3, 4, 5, 6].map((lineIndex) => (
          <input
            key={lineIndex}
            type="text"
            className={styles.noteLine}
            value={currentNote.split("\n")[lineIndex] || ""}
            onChange={(e) => handleNoteChange(lineIndex, e.target.value)}
            placeholder=""
          />
        ))}
      </div>
    </div>
  );
}
