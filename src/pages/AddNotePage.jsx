import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addNote } from '../utils/network-data';
import useInput from '../hooks/useInput';
import { useLocale } from '../contexts/LocaleContext';

function AddNotePage() {
  const navigate = useNavigate();
  const { t } = useLocale();
  const [title, onTitleChange] = useInput('');
  const [body, onBodyChange] = useInput('');

  const handleSubmit = async () => {
    if (!title.trim() || !body.trim()) return;
    const result = await addNote({ title, body });
    if (!result.error) {
      navigate('/');
    }
  };

  return (
    <div className="add-new-page__input">
      <input
        className="add-new-page__input__title"
        type="text"
        placeholder={t.noteTitle}
        value={title}
        onChange={onTitleChange}
        maxLength={50}
      />
      <textarea
        className="add-new-page__input__body"
        placeholder={t.noteBody}
        value={body}
        onChange={onBodyChange}
      />
      <div className="add-new-page__action">
        <button className="action" onClick={handleSubmit}>
          ✓
        </button>
      </div>
    </div>
  );
}

export default AddNotePage;
