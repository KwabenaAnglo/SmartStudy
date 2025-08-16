import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Brain, Trophy, Clock, Target, Star, CheckCircle } from 'lucide-react';
import { Basic4Subject } from '../types';
import { getAllSubjects, getAllTopics, getAllLessons } from '../data/basic4Data';

const Basic4Dashboard: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const navigate = useNavigate();
  const subjects = getAllSubjects();
  const topics = getAllTopics();
  const lessons = getAllLessons();

  const getSubjectProgress = (subject: Basic4Subject) => {
    const subjectTopics = topics.filter(t => t.subjectId === subject.id);
    const subjectLessons = lessons.filter(l => 
      subjectTopics.some(t => t.id === l.topicId)
    );
    const completedLessons = subjectLessons.filter(l => l.isCompleted).length;
    return Math.round((completedLessons / subject.totalLessons) * 100);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#28a745';
      case 'medium': return '#ffc107';
      case 'challenging': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '😊';
      case 'medium': return '🤔';
      case 'challenging': return '💪';
      default: return '📚';
    }
  };

  const handleStartLearning = (subjectId: string) => {
    const subjectTopics = topics.filter(t => t.subjectId === subjectId);
    const firstLesson = subjectTopics
      .flatMap(t => t.lessons)
      .sort((a, b) => a.lessonNumber - b.lessonNumber)[0];
    if (firstLesson) {
      navigate(`/lesson/${firstLesson.id}`);
    } else {
      // Fallback: expand subject details if no lessons found
      setSelectedSubject(subjectId);
    }
  };

  return (
    <div className="container">
      {/* Welcome Header */}
      <div className="card" style={{ textAlign: 'center', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '20px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: '#667eea',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            color: 'white'
          }}>
            🎓
          </div>
          <div>
            <h1 style={{ margin: 0, color: '#333', fontSize: '32px' }}>Welcome to Basic 4!</h1>
            <p style={{ margin: '8px 0 0 0', color: '#6c757d', fontSize: '18px' }}>
              Your learning adventure starts here
            </p>
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#667eea' }}>
            <BookOpen size={20} />
            <span>5 Subjects</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#28a745' }}>
            <Target size={20} />
            <span>107 Lessons</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffc107' }}>
            <Trophy size={20} />
            <span>Earn Badges</span>
          </div>
        </div>
      </div>

      {/* Subjects Grid */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ 
          marginBottom: '24px', 
          color: '#333', 
          fontSize: '28px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <BookOpen size={28} />
          Choose Your Subject
        </h2>
        
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {subjects.map((subject) => (
            <div 
              key={subject.id}
              className="card"
              style={{ 
                cursor: 'pointer',
                border: selectedSubject === subject.id ? `3px solid ${subject.color}` : '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s ease'
              }}
              onClick={() => setSelectedSubject(selectedSubject === subject.id ? null : subject.id)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  backgroundColor: subject.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  color: 'white'
                }}>
                  {subject.id === 'english' && '📚'}
                  {subject.id === 'mathematics' && '🔢'}
                  {subject.id === 'science' && '🔬'}
                  {subject.id === 'social-studies' && '🌍'}
                  {subject.id === 'ict' && '💻'}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 8px 0', color: '#333', fontSize: '20px' }}>
                    {subject.name}
                  </h3>
                  <p style={{ margin: 0, color: '#6c757d', fontSize: '14px' }}>
                    {subject.description}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', color: '#6c757d' }}>Progress</span>
                  <span style={{ fontSize: '14px', color: subject.color, fontWeight: '600' }}>
                    {getSubjectProgress(subject)}%
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  backgroundColor: '#e9ecef',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${getSubjectProgress(subject)}%`,
                    height: '100%',
                    backgroundColor: subject.color,
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: '#6c757d' }}>
                  {subject.totalLessons} lessons
                </span>
                <button
                  onClick={() => handleStartLearning(subject.id)}
                  className="btn"
                  style={{ 
                    padding: '8px 16px',
                    fontSize: '14px',
                    backgroundColor: subject.color
                  }}
                >
                  Start Learning
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Subject Details */}
      {selectedSubject && (
        <div className="card" style={{ marginBottom: '40px' }}>
          <h3 style={{ 
            marginBottom: '20px', 
            color: '#333',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <Brain size={24} />
            {subjects.find(s => s.id === selectedSubject)?.name} - Learning Path
          </h3>
          
          <div style={{ display: 'grid', gap: '16px' }}>
            {topics
              .filter(topic => topic.subjectId === selectedSubject)
              .map(topic => (
                <div key={topic.id} style={{
                  border: '1px solid #e9ecef',
                  borderRadius: '12px',
                  padding: '20px',
                  backgroundColor: 'rgba(255, 255, 255, 0.5)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div>
                      <h4 style={{ margin: '0 0 8px 0', color: '#333', fontSize: '18px' }}>
                        Topic {topic.lessonNumber}: {topic.name}
                      </h4>
                      <p style={{ margin: 0, color: '#6c757d', fontSize: '14px' }}>
                        Duration: {topic.duration}
                      </p>
                    </div>
                    <div style={{
                      padding: '4px 12px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '20px',
                      fontSize: '12px',
                      color: '#6c757d'
                    }}>
                      {topic.lessons.length} lessons
                    </div>
                  </div>

                  {/* Prerequisites */}
                  {topic.prerequisiteKnowledge.length > 0 && (
                    <div style={{ marginBottom: '16px' }}>
                      <span style={{ fontSize: '12px', color: '#6c757d', fontWeight: '600' }}>
                        Before you start, you should know:
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                        {topic.prerequisiteKnowledge.map((prereq, index) => (
                          <span key={index} style={{
                            padding: '4px 8px',
                            backgroundColor: '#e3f2fd',
                            color: '#1976d2',
                            borderRadius: '12px',
                            fontSize: '12px'
                          }}>
                            {prereq}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Lessons */}
                  <div style={{ display: 'grid', gap: '12px' }}>
                    {topic.lessons.map(lesson => (
                      <div key={lesson.id} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px',
                        backgroundColor: lesson.isCompleted ? '#d4edda' : '#f8f9fa',
                        borderRadius: '8px',
                        border: lesson.isCompleted ? '1px solid #c3e6cb' : '1px solid #e9ecef'
                      }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: lesson.isCompleted ? '#28a745' : '#6c757d',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '16px'
                        }}>
                          {lesson.isCompleted ? <CheckCircle size={16} /> : lesson.lessonNumber}
                        </div>
                        
                        <div style={{ flex: 1 }}>
                          <h5 style={{ margin: '0 0 4px 0', color: '#333', fontSize: '16px' }}>
                            {lesson.title}
                          </h5>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', color: '#6c757d' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Clock size={12} />
                              {lesson.duration}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              {getDifficultyIcon(lesson.difficulty)}
                              <span style={{ color: getDifficultyColor(lesson.difficulty) }}>
                                {lesson.difficulty}
                              </span>
                            </span>
                          </div>
                        </div>

                        <Link 
                          to={`/lesson/${lesson.id}`}
                          className="btn"
                          style={{ 
                            padding: '8px 16px',
                            fontSize: '14px',
                            backgroundColor: lesson.isCompleted ? '#28a745' : '#667eea'
                          }}
                        >
                          {lesson.isCompleted ? 'Review' : 'Start'}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="card">
        <h3 style={{ 
          marginBottom: '20px', 
          color: '#333',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <Star size={24} />
          Quick Actions
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <Link to="/quizzes" className="card" style={{ 
            textDecoration: 'none', 
            textAlign: 'center',
            padding: '24px',
            cursor: 'pointer',
            transition: 'transform 0.2s ease'
          }}>
            <Brain size={32} style={{ color: '#667eea', marginBottom: '12px' }} />
            <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>Take a Quiz</h4>
            <p style={{ margin: 0, color: '#6c757d', fontSize: '14px' }}>
              Test your knowledge
            </p>
          </Link>

          <Link to="/progress" className="card" style={{ 
            textDecoration: 'none', 
            textAlign: 'center',
            padding: '24px',
            cursor: 'pointer',
            transition: 'transform 0.2s ease'
          }}>
            <Trophy size={32} style={{ color: '#ffc107', marginBottom: '12px' }} />
            <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>View Progress</h4>
            <p style={{ margin: 0, color: '#6c757d', fontSize: '14px' }}>
              See your achievements
            </p>
          </Link>

          <Link to="/profile" className="card" style={{ 
            textDecoration: 'none', 
            textAlign: 'center',
            padding: '24px',
            cursor: 'pointer',
            transition: 'transform 0.2s ease'
          }}>
            <Star size={32} style={{ color: '#28a745', marginBottom: '12px' }} />
            <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>My Profile</h4>
            <p style={{ margin: 0, color: '#6c757d', fontSize: '14px' }}>
              Update your information
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Basic4Dashboard;
