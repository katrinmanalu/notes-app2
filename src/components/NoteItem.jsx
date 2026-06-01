import React from 'react';
import { useNavigate } from 'react-router-dom';
import { showFormattedDate } from '../utils/index';

function NoteItem({ id, title, body, createdAt }) {
  const navigate = useNavigate();

  return (
    <div className="note-item" onClick={() => navigate(`/notes/${id}`)}>
      <h3 className="note-item__title">{title}</h3>
      <p className="note-item__createdAt">{showFormattedDate(createdAt)}</p>
      <p className="note-item__body">{body}</p>
    </div>
  );
}

export default NoteItem;
