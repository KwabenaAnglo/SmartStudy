import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Volume2, BookOpen, Target, Clock, Star, CheckCircle, VolumeX } from 'lucide-react';
import { Lesson, Topic, Basic4Subject } from '../types';
import { getAllLessons, getAllTopics, getAllSubjects } from '../data/basic4Data';

const LessonViewer: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [subject, setSubject] = useState<Basic4Subject | null>(null);
  const [currentSection, setCurrentSection] = useState<'content' | 'vocabulary' | 'examples' | 'quiz'>('content');
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (lessonId) {
      const lessons = getAllLessons();
      const foundLesson = lessons.find(l => l.id === lessonId);
      
      if (foundLesson) {
        setLesson(foundLesson);
        
        const topics = getAllTopics();
        const foundTopic = topics.find(t => t.id === foundLesson.topicId);
        if (foundTopic) {
          setTopic(foundTopic);
          
          const subjects = getAllSubjects();
          const foundSubject = subjects.find(s => s.id === foundTopic.subjectId);
          if (foundSubject) {
            setSubject(foundSubject);
          }
        }
      }
    }
  }, [lessonId]);

  const handleCompleteLesson = () => {
    if (lesson) {
      // In a real app, this would save to the database
      setCompleted(true);
      // Mark lesson as completed in localStorage
      const completedLessons = JSON.parse(localStorage.getItem('smartstudy_completed_lessons') || '[]');
      if (!completedLessons.includes(lesson.id)) {
        completedLessons.push(lesson.id);
        localStorage.setItem('smartstudy_completed_lessons', JSON.stringify(completedLessons));
      }
    }
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

  if (!lesson || !topic || !subject) {
    return (
      <div className="container">
        <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '3px solid #e9ecef',
            borderTop: '3px solid #667eea',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }} />
          <p style={{ color: '#6c757d' }}>Loading lesson...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Lesson Header */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
          <Link to="/" className="btn btn-secondary" style={{ padding: '8px 12px' }}>
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
          
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <span style={{ 
                padding: '4px 12px', 
                backgroundColor: '#f8f9fa', 
                borderRadius: '20px',
                fontSize: '12px',
                color: '#6c757d'
              }}>
                {subject.name}
              </span>
              <span style={{ 
                padding: '4px 12px', 
                backgroundColor: '#e3f2fd', 
                borderRadius: '20px',
                fontSize: '12px',
                color: '#1976d2'
              }}>
                Topic {topic.lessonNumber}: {topic.name}
              </span>
            </div>
            <h1 style={{ margin: 0, color: '#333', fontSize: '28px' }}>
              Lesson {lesson.lessonNumber}: {lesson.title}
            </h1>
          </div>
        </div>

        {/* Lesson Info */}
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6c757d' }}>
            <Clock size={16} />
            <span>{lesson.duration}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: getDifficultyColor(lesson.difficulty) }}>
            {getDifficultyIcon(lesson.difficulty)}
            <span style={{ textTransform: 'capitalize' }}>{lesson.difficulty}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: completed ? '#28a745' : '#6c757d' }}>
            {completed ? <CheckCircle size={16} /> : <BookOpen size={16} />}
            <span>{completed ? 'Completed' : 'In Progress'}</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="card" style={{ marginBottom: '24px', padding: '0' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid #e9ecef' }}>
          {[
            { id: 'content', label: 'Lesson Content', icon: BookOpen },
            { id: 'vocabulary', label: 'Key Vocabulary', icon: Target },
            { id: 'examples', label: 'Examples', icon: Star },
            { id: 'quiz', label: 'Take Quiz', icon: Play }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentSection(tab.id as any)}
                style={{
                  flex: 1,
                  padding: '16px',
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  borderBottom: currentSection === tab.id ? `3px solid ${subject.color}` : '3px solid transparent',
                  color: currentSection === tab.id ? subject.color : '#6c757d',
                  fontWeight: currentSection === tab.id ? '600' : '500',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Icon size={16} />
                  {tab.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Sections */}
      <div className="card">
        {currentSection === 'content' && (
          <div>
            {/* Learning Objectives */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ 
                marginBottom: '16px', 
                color: '#333',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <Target size={20} />
                What You Will Learn
              </h3>
              <div style={{ display: 'grid', gap: '12px' }}>
                {lesson.learningObjectives.map((objective, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    padding: '16px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    border: '1px solid #e9ecef'
                  }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: subject.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: '600',
                      flexShrink: 0
                    }}>
                      {index + 1}
                    </div>
                    <span style={{ color: '#333', lineHeight: '1.5' }}>{objective}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Lesson Content */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ 
                marginBottom: '16px', 
                color: '#333',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <BookOpen size={20} />
                Lesson Content
              </h3>
              <div style={{
                padding: '24px',
                backgroundColor: '#f8f9fa',
                borderRadius: '12px',
                border: '1px solid #e9ecef',
                lineHeight: '1.8',
                fontSize: '16px',
                color: '#333'
              }}>
                {lesson.content.split('\n').map((paragraph, index) => (
                  <p key={index} style={{ margin: index > 0 ? '16px 0 0 0' : '0' }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Illustrations */}
            {lesson.illustrations.length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ 
                  marginBottom: '16px', 
                  color: '#333',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <Star size={20} />
                  Visual Aids
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  {lesson.illustrations.map((image, index) => (
                    <div key={index} style={{
                      padding: '16px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px',
                      border: '1px solid #e9ecef',
                      textAlign: 'center'
                    }}>
                      <div style={{
                        width: '100%',
                        height: '120px',
                        backgroundColor: '#e9ecef',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#6c757d',
                        fontSize: '14px',
                        marginBottom: '8px'
                      }}>
                        📷 Image {index + 1}
                      </div>
                      <span style={{ fontSize: '12px', color: '#6c757d' }}>
                        {image.split('/').pop()?.replace('.jpg', '').replace(/-/g, ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Complete Lesson Button */}
            {!completed && (
              <div style={{ textAlign: 'center', marginTop: '32px' }}>
                <button
                  onClick={handleCompleteLesson}
                  className="btn"
                  style={{ 
                    padding: '16px 32px',
                    fontSize: '18px',
                    backgroundColor: subject.color
                  }}
                >
                  <CheckCircle size={20} style={{ marginRight: '8px' }} />
                  Mark Lesson as Complete
                </button>
              </div>
            )}

            {completed && (
              <div style={{ 
                textAlign: 'center', 
                padding: '24px',
                backgroundColor: '#d4edda',
                borderRadius: '12px',
                border: '1px solid #c3e6cb',
                marginTop: '32px'
              }}>
                <CheckCircle size={32} style={{ color: '#28a745', marginBottom: '12px' }} />
                <h4 style={{ margin: '0 0 8px 0', color: '#155724' }}>Great job!</h4>
                <p style={{ margin: 0, color: '#155724' }}>
                  You've completed this lesson. Ready to take the quiz?
                </p>
                <button
                  onClick={() => setCurrentSection('quiz')}
                  className="btn"
                  style={{ 
                    marginTop: '16px',
                    backgroundColor: subject.color
                  }}
                >
                  Take Quiz
                </button>
              </div>
            )}
          </div>
        )}

        {currentSection === 'vocabulary' && (
          <div>
            <h3 style={{ 
              marginBottom: '24px', 
              color: '#333',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <Target size={20} />
              Key Vocabulary
            </h3>
            
            <div style={{ display: 'grid', gap: '20px' }}>
              {lesson.keyVocabulary.map((vocab, index) => (
                <div key={index} className="card" style={{ margin: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: subject.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '16px',
                      fontWeight: '600',
                      flexShrink: 0
                    }}>
                      {index + 1}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <h4 style={{ 
                        margin: '0 0 8px 0', 
                        color: '#333',
                        fontSize: '18px',
                        fontWeight: '600'
                      }}>
                        {vocab.term}
                      </h4>
                      
                      <div style={{ marginBottom: '12px' }}>
                        <span style={{ 
                          fontSize: '14px', 
                          color: '#6c757d',
                          fontWeight: '600'
                        }}>
                          Definition:
                        </span>
                        <p style={{ margin: '8px 0 0 0', color: '#333', lineHeight: '1.5' }}>
                          {vocab.definition}
                        </p>
                      </div>
                      
                      <div>
                        <span style={{ 
                          fontSize: '14px', 
                          color: '#6c757d',
                          fontWeight: '600'
                        }}>
                          Example:
                        </span>
                        <p style={{ margin: '8px 0 0 0', color: '#333', lineHeight: '1.5' }}>
                          {vocab.example}
                        </p>
                      </div>
                    </div>
                    
                    {vocab.pronunciation && (
                      <button
                        onClick={() => setAudioPlaying(!audioPlaying)}
                        style={{
                          padding: '8px',
                          borderRadius: '50%',
                          border: 'none',
                          backgroundColor: audioPlaying ? '#dc3545' : subject.color,
                          color: 'white',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {audioPlaying ? <VolumeX size={16} /> : <Volume2 size={16} />}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentSection === 'examples' && (
          <div>
            <h3 style={{ 
              marginBottom: '24px', 
              color: '#333',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <Star size={20} />
              Examples and Practice
            </h3>
            
            <div style={{ display: 'grid', gap: '20px' }}>
              {lesson.examples.map((example, index) => (
                <div key={index} className="card" style={{ margin: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: subject.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '16px',
                      fontWeight: '600',
                      flexShrink: 0
                    }}>
                      {index + 1}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <h4 style={{ 
                        margin: '0 0 8px 0', 
                        color: '#333',
                        fontSize: '18px',
                        fontWeight: '600'
                      }}>
                        {example.description}
                      </h4>
                      
                      <p style={{ margin: 0, color: '#333', lineHeight: '1.6' }}>
                        {example.explanation}
                      </p>
                      
                      {example.imageUrl && (
                        <div style={{ marginTop: '16px' }}>
                          <div style={{
                            width: '100%',
                            height: '120px',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#6c757d',
                            fontSize: '14px',
                            border: '1px solid #e9ecef'
                          }}>
                            📷 Example Image
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentSection === 'quiz' && (
          <div>
            <h3 style={{ 
              marginBottom: '24px', 
              color: '#333',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <Play size={20} />
              Ready for the Quiz?
            </h3>
            
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: subject.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                color: 'white',
                margin: '0 auto 24px'
              }}>
                🧠
              </div>
              
              <h4 style={{ margin: '0 0 16px 0', color: '#333', fontSize: '24px' }}>
                Test Your Knowledge
              </h4>
              
              <p style={{ margin: '0 0 24px 0', color: '#6c757d', fontSize: '16px', lineHeight: '1.6' }}>
                Now that you've completed the lesson, take a quiz to see how much you've learned!
              </p>
              
              <Link 
                to={`/take-quiz/${lesson.id}`}
                className="btn"
                style={{ 
                  padding: '16px 32px',
                  fontSize: '18px',
                  backgroundColor: subject.color
                }}
              >
                <Play size={20} style={{ marginRight: '8px' }} />
                Start Quiz
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonViewer;
