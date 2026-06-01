import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LoadingIndicator from '../components/LoadingIndicator';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/network-data';
import { showFormattedDate } from '../utils/index';

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true);
      const result = await getNote(id);
      if (!result.error) {
        setNote(result.data);
      } else {
        navigate('/');
      }
      setLoading(false);
    };

    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    const result = await deleteNote(id);
    if (!result.error) {
      navigate('/');
    }
  };

  const handleArchiveToggle = async () => {
    if (note.archived) {
      await unarchiveNote(id);
      navigate('/archived');
    } else {
      await archiveNote(id);
      navigate('/');
    }
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  if (!note) {
    return null;
  }

  return (
    <div className="detail-page">
      <h2 className="detail-page__title">{note.title}</h2>
      <p className="detail-page__createdAt">{showFormattedDate(note.createdAt)}</p>
      <p className="detail-page__body">{note.body}</p>

      <div className="detail-page__action">
        <button className="action" onClick={handleArchiveToggle}>
          {note.archived ? '📤' : '📥'}
        </button>
        <button className="action" onClick={handleDelete}>
          🗑️
        </button>
      </div>
    </div>
  );
}

export default DetailPage;
