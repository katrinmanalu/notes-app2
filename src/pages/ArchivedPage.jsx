import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import LoadingIndicator from '../components/LoadingIndicator';
import { getArchivedNotes } from '../utils/network-data';
import { useLocale } from '../contexts/LocaleContext';

function ArchivedPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const { locale } = useLocale();

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      const result = await getArchivedNotes();
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
      <h2 className="section-title">{locale === 'id' ? 'Catatan Arsip' : 'Archived Note'}</h2>
      <SearchBar keyword={keyword} onKeywordChange={onKeywordChangeHandler} />
      <NoteList notes={filteredNotes} />
    </main>
  );
}

export default ArchivedPage;
