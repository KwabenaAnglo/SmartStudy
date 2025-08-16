import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Trash2, Search, Play, Filter } from 'lucide-react';
import { Quiz, Subject } from '../types';

interface QuizzesProps {
  quizzes: Quiz[];
  subjects: Subject[];
  onDelete: (id: string) => void;
}

const Quizzes: React.FC<QuizzesProps> = ({ quizzes, subjects, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || quiz.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

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

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this quiz? This action cannot be undone.')) {
      onDelete(id);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1 style={{ color: '#333' }}>My Quizzes</h1>
          <Link to="/create-quiz" className="btn">
            <Plus size={20} style={{ marginRight: '8px' }} />
            Create Quiz
          </Link>
        </div>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ position: 'relative' }}>
              <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d' }} />
              <input
                type="text"
                placeholder="Search quizzes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '40px' }}
              />
            </div>
          </div>
          
          <div style={{ minWidth: '150px' }}>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="form-input"
            >
              <option value="all">All Subjects</option>
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredQuizzes.length > 0 ? (
          <div className="grid">
            {filteredQuizzes.map(quiz => (
              <div key={quiz.id} className="quiz-card">
                <h3 style={{ marginBottom: '12px', color: '#333' }}>{quiz.title}</h3>
                <div style={{ marginBottom: '16px', color: '#6c757d' }}>
                  <strong>{quiz.questions.length}</strong> questions • {getSubjectName(quiz.subject)}
                </div>
                <div style={{ marginBottom: '16px', fontSize: '14px', color: '#adb5bd' }}>
                  Created: {formatDate(quiz.createdAt)}
                </div>
                
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <Link to={`/take-quiz/${quiz.id}`} className="btn btn-sm">
                    <Play size={16} style={{ marginRight: '4px' }} />
                    Take Quiz
                  </Link>
                  <button
                    onClick={() => handleDelete(quiz.id)}
                    className="btn btn-danger btn-sm"
                  >
                    <Trash2 size={16} style={{ marginRight: '4px' }} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">🧠</div>
            <p>
              {searchTerm || selectedSubject !== 'all' 
                ? 'No quizzes match your search criteria.' 
                : 'No quizzes yet. Create your first quiz to test your knowledge!'
              }
            </p>
            {searchTerm || selectedSubject !== 'all' ? (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSubject('all');
                }}
                className="btn btn-secondary"
                style={{ marginTop: '16px' }}
              >
                Clear Filters
              </button>
            ) : (
              <Link to="/create-quiz" className="btn" style={{ marginTop: '16px' }}>
                Create Quiz
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quizzes;
