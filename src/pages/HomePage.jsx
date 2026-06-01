import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import LoadingIndicator from '../components/LoadingIndicator';
import { getActiveNotes } from '../utils/network-data';
import { useLocale } from '../contexts/LocaleContext';

function HomePage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const navigate = useNavigate();
  const { locale, t } = useLocale();

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      const result = await getActiveNotes();
      if (!result.error) {
        setNotes(result.data);
      }
      setLoading(false);
    };

    fetchNotes();
  }, []);

  const onKeywordChangeHandler = (value) => {
    setSearchParams(value ? { keyword: value } : {});
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <main>
      <h2 className="section-title">{locale === 'id' ? 'Catatan Aktif' : 'Active Note'}</h2>
      <SearchBar keyword={keyword} onKeywordChange={onKeywordChangeHandler} />
      <NoteList notes={filteredNotes} />
      <div className="homepage__action">
        <button className="action" onClick={() => navigate('/notes/new')}>
          +
        </button>
      </div>
    </main>
  );
}

export default HomePage;
