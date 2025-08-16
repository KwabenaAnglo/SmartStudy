import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import Basic4Dashboard from './components/Basic4Dashboard';
import LessonViewer from './components/LessonViewer';
import Notes from './components/Notes';
import Quizzes from './components/Quizzes';
import CreateNote from './components/CreateNote';
import CreateQuiz from './components/CreateQuiz';
import TakeQuiz from './components/TakeQuiz';
import Login from './components/Login';
import Signup from './components/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import { Note, Quiz, QuizResult, Subject } from './types';

function AppContent() {
  const { user, isAuthenticated } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [subjects] = useState<Subject[]>([
    { id: 'math', name: 'Mathematics', color: '#667eea' },
    { id: 'science', name: 'Science', color: '#28a745' },
    { id: 'history', name: 'History', color: '#ffc107' },
    { id: 'english', name: 'English', color: '#dc3545' },
    { id: 'other', name: 'Other', color: '#6c757d' }
  ]);

  // Load data from localStorage on component mount and when user changes
  useEffect(() => {
    if (isAuthenticated && user) {
      const savedNotes = localStorage.getItem(`smartstudy_notes_${user.id}`);
      const savedQuizzes = localStorage.getItem(`smartstudy_quizzes_${user.id}`);
      const savedResults = localStorage.getItem(`smartstudy_results_${user.id}`);

      if (savedNotes) {
        const parsedNotes = JSON.parse(savedNotes).map((note: any) => ({
          ...note,
          createdAt: new Date(note.createdAt),
          updatedAt: new Date(note.updatedAt)
        }));
        setNotes(parsedNotes);
      }

      if (savedQuizzes) {
        const parsedQuizzes = JSON.parse(savedQuizzes).map((quiz: any) => ({
          ...quiz,
          createdAt: new Date(quiz.createdAt)
        }));
        setQuizzes(parsedQuizzes);
      }

      if (savedResults) {
        const parsedResults = JSON.parse(savedResults).map((result: any) => ({
          ...result,
          completedAt: new Date(result.completedAt)
        }));
        setQuizResults(parsedResults);
      }
    } else {
      // Clear data when user logs out
      setNotes([]);
      setQuizzes([]);
      setQuizResults([]);
    }
  }, [isAuthenticated, user]);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem(`smartstudy_notes_${user.id}`, JSON.stringify(notes));
    }
  }, [notes, isAuthenticated, user]);

  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem(`smartstudy_quizzes_${user.id}`, JSON.stringify(quizzes));
    }
  }, [quizzes, isAuthenticated, user]);

  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem(`smartstudy_results_${user.id}`, JSON.stringify(quizResults));
    }
  }, [quizResults, isAuthenticated, user]);

  const addNote = (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => {
    if (!user) return;

    const newNote: Note = {
      ...note,
      id: Date.now().toString(),
      userId: user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setNotes(prev => [newNote, ...prev]);
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes(prev => prev.map(note =>
      note.id === id
        ? { ...note, ...updates, updatedAt: new Date() }
        : note
    ));
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const addQuiz = (quiz: Omit<Quiz, 'id' | 'createdAt' | 'userId'>) => {
    if (!user) return;

    const newQuiz: Quiz = {
      ...quiz,
      id: Date.now().toString(),
      userId: user.id,
      createdAt: new Date()
    };
    setQuizzes(prev => [newQuiz, ...prev]);
  };

  // Adapter for CreateQuiz component's expected onSubmit signature
  const handleCreateQuiz = (input: { title: string; subject: string; questions: { text: string; options: string[]; correctAnswer: number; explanation?: string }[] }) => {
    const quizPayload: Omit<Quiz, 'id' | 'createdAt' | 'userId'> = {
      title: input.title,
      subject: input.subject,
      questions: input.questions.map((q, idx) => ({
        id: `${Date.now()}-${idx}`,
        text: q.text,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation || ''
      }))
    };
    addQuiz(quizPayload);
  };

  const deleteQuiz = (id: string) => {
    setQuizzes(prev => prev.filter(quiz => quiz.id !== id));
    setQuizResults(prev => prev.filter(result => result.quizId !== id));
  };

  const addQuizResult = (result: Omit<QuizResult, 'id' | 'completedAt' | 'userId'>) => {
    if (!user) return;

    const newResult: QuizResult = {
      ...result,
      id: Date.now().toString(),
      userId: user.id,
      completedAt: new Date()
    };
    setQuizResults(prev => [newResult, ...prev]);
  };

  return (
    <div className="App">
      <Navigation />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/" replace /> : <Login />
        } />
        <Route path="/signup" element={
          isAuthenticated ? <Navigate to="/" replace /> : <Signup />
        } />

        {/* Protected routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Basic4Dashboard />
          </ProtectedRoute>
        } />

        {/* Basic 4 Educational Routes */}
        <Route path="/lesson/:lessonId" element={
          <ProtectedRoute>
            <LessonViewer />
          </ProtectedRoute>
        } />

        {/* Legacy routes (kept for compatibility) */}
        <Route path="/notes" element={
          <ProtectedRoute>
            <Notes
              notes={notes}
              subjects={subjects}
              onUpdate={updateNote}
              onDelete={deleteNote}
            />
          </ProtectedRoute>
        } />
        <Route path="/quizzes" element={
          <ProtectedRoute>
            <Quizzes
              quizzes={quizzes}
              subjects={subjects}
              onDelete={deleteQuiz}
            />
          </ProtectedRoute>
        } />
        <Route path="/create-note" element={
          <ProtectedRoute>
            <CreateNote
              subjects={subjects}
              onSubmit={addNote}
            />
          </ProtectedRoute>
        } />
        <Route path="/create-quiz" element={
          <ProtectedRoute>
            <CreateQuiz
              subjects={subjects}
              onSubmit={handleCreateQuiz}
            />
          </ProtectedRoute>
        } />
        <Route path="/take-quiz/:id" element={
          <ProtectedRoute>
            <TakeQuiz
              quizzes={quizzes}
              onSubmit={addQuizResult}
            />
          </ProtectedRoute>
        } />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
