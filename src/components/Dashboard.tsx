import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, FileText, Brain, TrendingUp, BookOpen } from 'lucide-react';
import { Note, Quiz, QuizResult, Subject } from '../types';

interface DashboardProps {
  notes: Note[];
  quizzes: Quiz[];
  quizResults: QuizResult[];
  subjects: Subject[];
}

const Dashboard: React.FC<DashboardProps> = ({ notes, quizzes, quizResults, subjects }) => {
  const totalNotes = notes.length;
  const totalQuizzes = quizzes.length;
  const totalAttempts = quizResults.length;
  
  const averageScore = totalAttempts > 0 
    ? Math.round(quizResults.reduce((sum, result) => sum + result.score, 0) / totalAttempts)
    : 0;

  const recentNotes = notes.slice(0, 3);
  const recentQuizzes = quizzes.slice(0, 3);

  const getSubjectName = (subjectId: string) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject?.name || 'Unknown';
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="container">
      <div className="card">
        <h1 style={{ marginBottom: '20px', color: '#333' }}>Welcome to SmartStudy!</h1>
        <p style={{ color: '#6c757d', marginBottom: '30px' }}>
          Track your learning progress, manage your notes, and test your knowledge with quizzes.
        </p>
        
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Link to="/create-note" className="btn">
            <Plus size={20} style={{ marginRight: '8px' }} />
            Add Note
          </Link>
          <Link to="/create-quiz" className="btn">
            <Plus size={20} style={{ marginRight: '8px' }} />
            Create Quiz
          </Link>
        </div>
      </div>

      <div className="stats">
        <div className="stat-card">
          <div className="stat-number">{totalNotes}</div>
          <div className="stat-label">Total Notes</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalQuizzes}</div>
          <div className="stat-label">Total Quizzes</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalAttempts}</div>
          <div className="stat-label">Quiz Attempts</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{averageScore}%</div>
          <div className="stat-label">Average Score</div>
        </div>
      </div>

      <div className="grid">
        <div className="card">
          <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={24} />
            Recent Notes
          </h3>
          {recentNotes.length > 0 ? (
            <div className="notes-list">
              {recentNotes.map(note => (
                <div key={note.id} className="note-item">
                  <div className="note-title">{note.title}</div>
                  <div className="note-content">
                    {note.content.length > 100 
                      ? `${note.content.substring(0, 100)}...` 
                      : note.content
                    }
                  </div>
                  <div className="note-meta">
                    <span>{getSubjectName(note.subject)}</span>
                    <span>{formatDate(note.updatedAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">📝</div>
              <p>No notes yet. Create your first note to get started!</p>
            </div>
          )}
          <div style={{ marginTop: '20px' }}>
            <Link to="/notes" className="btn btn-secondary">
              View All Notes
            </Link>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Brain size={24} />
            Recent Quizzes
          </h3>
          {recentQuizzes.length > 0 ? (
            <div className="notes-list">
              {recentQuizzes.map(quiz => (
                <div key={quiz.id} className="note-item">
                  <div className="note-title">{quiz.title}</div>
                  <div className="note-content">
                    {quiz.questions.length} questions • {getSubjectName(quiz.subject)}
                  </div>
                  <div className="note-meta">
                    <span>{quiz.questions.length} questions</span>
                    <span>{formatDate(quiz.createdAt)}</span>
                  </div>
                  <div style={{ marginTop: '12px' }}>
                    <Link to={`/take-quiz/${quiz.id}`} className="btn btn-sm">
                      Take Quiz
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">🧠</div>
              <p>No quizzes yet. Create your first quiz to test your knowledge!</p>
            </div>
          )}
          <div style={{ marginTop: '20px' }}>
            <Link to="/quizzes" className="btn btn-secondary">
              View All Quizzes
            </Link>
          </div>
        </div>
      </div>

      {totalAttempts > 0 && (
        <div className="card">
          <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={24} />
            Recent Quiz Results
          </h3>
          <div className="grid">
            {quizResults.slice(0, 4).map(result => {
              const quiz = quizzes.find(q => q.id === result.quizId);
              return (
                <div key={result.quizId} className="quiz-card">
                  <h4>{quiz?.title || 'Unknown Quiz'}</h4>
                  <div style={{ marginBottom: '12px' }}>
                    Score: <strong>{result.score}%</strong> ({result.correctAnswers}/{result.totalQuestions})
                  </div>
                  <div style={{ fontSize: '12px', color: '#6c757d' }}>
                    Completed: {formatDate(result.completedAt)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
