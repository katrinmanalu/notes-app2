import React from 'react';
import NoteItem from './NoteItem';
import { useLocale } from '../contexts/LocaleContext';

function NoteList({ notes }) {
  const { t } = useLocale();

  if (notes.length === 0) {
    return (
      <div className="notes-list-empty">
        <p>{t.emptyNotes}</p>
      </div>
    );
  }

  return (
    <div className="notes-list">
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          id={note.id}
          title={note.title}
          body={note.body}
          createdAt={note.createdAt}
        />
      ))}
    </div>
  );
}

export default NoteList;
