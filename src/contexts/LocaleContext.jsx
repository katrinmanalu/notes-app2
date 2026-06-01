import React, { createContext, useState, useContext, useEffect } from 'react';

const LocaleContext = createContext();

const translations = {
  id: {
    appTitle: 'Aplikasi Catatan',
    activeNotes: 'Catatan Aktif',
    archivedNotes: 'Terarsip',
    archivedPageTitle: 'Catatan Arsip',
    searchPlaceholder: 'Cari berdasarkan judul ...',
    emptyNotes: 'Tidak ada catatan.',
    addNote: 'Tambah',
    deleteNote: 'Hapus',
    archiveNote: 'Arsipkan',
    unarchiveNote: 'Batal Arsip',
    logout: 'Keluar',
    login: 'Login',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    name: 'Name',
    loginSubtitle2: 'Yuk, login untuk menggunakan aplikasi.',
    loginSubtitle: 'Belum punya akun?',
    registerHere: 'Daftar di sini',
    registerSubtitle2: 'Isi form untuk mendaftar akun.',
    registerSubtitle: 'Sudah punya akun?',
    loginHere: 'Login di sini',
    noteTitle: 'Judul catatan...',
    noteBody: 'Tulis catatanmu di sini...',
    save: 'Simpan',
    back: 'Kembali',
    loading: 'Memuat...',
    passwordMismatch: 'Kata sandi tidak cocok!',
  },
  en: {
    appTitle: 'Notes App',
    activeNotes: 'Archived',
    archivedNotes: 'Archived',
    archivedPageTitle: 'Archived Note',
    searchPlaceholder: 'Search by title ...',
    emptyNotes: 'No notes found.',
    addNote: 'Add',
    deleteNote: 'Delete',
    archiveNote: 'Archive',
    unarchiveNote: 'Unarchive',
    logout: 'Logout',
    login: 'Login',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    name: 'Name',
    loginSubtitle2: 'Login to use app, please.',
    loginSubtitle: "Don't have an account?",
    registerHere: 'Register here',
    registerSubtitle2: 'Fill the form to register account.',
    registerSubtitle: 'Already have an account?',
    loginHere: 'Login here',
    noteTitle: 'Note title...',
    noteBody: 'Write your note here...',
    save: 'Save',
    back: 'Back',
    loading: 'Loading...',
    passwordMismatch: 'Passwords do not match!',
  },
};

function LocaleProvider({ children }) {
  const [locale, setLocale] = useState(() => {
    return localStorage.getItem('locale') || 'id';
  });

  useEffect(() => {
    localStorage.setItem('locale', locale);
  }, [locale]);

  const toggleLocale = () => {
    setLocale((prev) => (prev === 'id' ? 'en' : 'id'));
  };

  const t = translations[locale];

  return (
    <LocaleContext.Provider value={{ locale, toggleLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

function useLocale() {
  return useContext(LocaleContext);
}

export { LocaleProvider, useLocale };
