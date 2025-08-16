import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, X, RotateCcw, BarChart3 } from 'lucide-react';
import { Quiz } from '../types';
import { getAllLessons } from '../data/basic4Data';

interface TakeQuizProps {
  quizzes: Quiz[];
  onSubmit: (result: { quizId: string; score: number; totalQuestions: number; correctAnswers: number }) => void;
}

const TakeQuiz: React.FC<TakeQuizProps> = ({ quizzes, onSubmit }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeStarted, setTimeStarted] = useState<Date | null>(null);

  const [generatedQuiz, setGeneratedQuiz] = useState<Quiz | null>(null);
  const quiz = quizzes.find(q => q.id === id) || generatedQuiz;

  useEffect(() => {
    // If no provided quiz matches the id, try to generate one from the lessonId
    if (!quizzes.find(q => q.id === id) && id) {
      const lessons = getAllLessons();
      const lesson = lessons.find(l => l.id === id);
      if (lesson) {
        // Build a simple MCQ quiz from vocabulary terms
        const terms = lesson.keyVocabulary.map(v => v.term);
        const questions = lesson.keyVocabulary
          .slice(0, Math.max(1, Math.min(5, lesson.keyVocabulary.length)))
          .map((vocab, idx) => {
            const incorrect = terms.filter(t => t !== vocab.term);
            // pick up to 3 incorrect options
            const shuffledIncorrect = incorrect.sort(() => Math.random() - 0.5).slice(0, 3);
            const optionsPool = [vocab.term, ...shuffledIncorrect];
            const shuffled = optionsPool.sort(() => Math.random() - 0.5);
            const correctIndex = shuffled.indexOf(vocab.term);
            return {
              id: `auto-q${idx + 1}`,
              text: `Which term matches: "${vocab.definition}"?`,
              options: shuffled,
              correctAnswer: correctIndex,
            } as Quiz['questions'][number];
          });

        const autoQuiz: Quiz = {
          id: `auto-${lesson.id}`,
          title: `${lesson.title} • Quick Check`,
          subject: '',
          questions,
          createdAt: new Date(),
          userId: 'auto',
        } as Quiz;

        setGeneratedQuiz(autoQuiz);
      }
    }
  }, [id, quizzes]);

  useEffect(() => {
    if (quiz) {
      setTimeStarted(new Date());
      setSelectedAnswers(new Array(quiz.questions.length).fill(-1));
    }
  }, [quiz]);

  if (!quiz) {
    return (
      <div className="container">
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">❌</div>
            <p>Quiz not found!</p>
            <button onClick={() => navigate('/quizzes')} className="btn">
              Back to Quizzes
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const finishQuiz = () => {
    const correctAnswers = selectedAnswers.reduce((count, answer, index) => {
      return count + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
    }, 0);
    
    const score = Math.round((correctAnswers / quiz.questions.length) * 100);
    
    onSubmit({
      quizId: quiz.id,
      score,
      totalQuestions: quiz.questions.length,
      correctAnswers
    });
    
    setShowResults(true);
  };

  const retakeQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(quiz.questions.length).fill(-1));
    setShowResults(false);
    setTimeStarted(new Date());
  };

  const currentQ = quiz.questions[currentQuestion];
  const isLastQuestion = currentQuestion === quiz.questions.length - 1;
  const allQuestionsAnswered = selectedAnswers.every(answer => answer !== -1);

  if (showResults) {
    const correctAnswers = selectedAnswers.reduce((count, answer, index) => {
      return count + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
    }, 0);
    
    const score = Math.round((correctAnswers / quiz.questions.length) * 100);
    const timeSpent = timeStarted ? Math.round((Date.now() - timeStarted.getTime()) / 1000) : 0;

    return (
      <div className="container">
        <div className="card">
          <h1 style={{ textAlign: 'center', marginBottom: '32px', color: '#333' }}>Quiz Results</h1>
          
          <div className="stats">
            <div className="stat-card">
              <div className="stat-number">{score}%</div>
              <div className="stat-label">Score</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{correctAnswers}/{quiz.questions.length}</div>
              <div className="stat-label">Correct Answers</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{timeSpent}s</div>
              <div className="stat-label">Time Spent</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">
                {score >= 80 ? '🎉' : score >= 60 ? '👍' : '📚'}
              </div>
              <div className="stat-label">
                {score >= 80 ? 'Excellent!' : score >= 60 ? 'Good Job!' : 'Keep Studying!'}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '32px' }}>
            <h3 style={{ marginBottom: '20px', color: '#333' }}>Question Review</h3>
            {quiz.questions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div key={index} className="quiz-card" style={{ marginBottom: '16px' }}>
                  <h4 style={{ marginBottom: '16px', color: '#333' }}>
                    Question {index + 1}: {question.text}
                  </h4>
                  
                  <div style={{ marginBottom: '16px' }}>
                    {question.options.map((option, optionIndex) => {
                      let optionClass = 'quiz-option';
                      if (optionIndex === question.correctAnswer) {
                        optionClass += ' correct';
                      } else if (optionIndex === userAnswer && !isCorrect) {
                        optionClass += ' incorrect';
                      }
                      
                      return (
                        <div key={optionIndex} className={optionClass}>
                          {option}
                          {optionIndex === question.correctAnswer && (
                            <Check size={16} style={{ marginLeft: '8px' }} />
                          )}
                          {optionIndex === userAnswer && !isCorrect && (
                            <X size={16} style={{ marginLeft: '8px' }} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                  
                  {question.explanation && (
                    <div style={{ 
                      backgroundColor: '#e7f3ff', 
                      padding: '12px', 
                      borderRadius: '8px', 
                      borderLeft: '4px solid #007bff',
                      fontSize: '14px',
                      color: '#0056b3'
                    }}>
                      <strong>Explanation:</strong> {question.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '32px' }}>
            <button onClick={retakeQuiz} className="btn">
              <RotateCcw size={20} style={{ marginRight: '8px' }} />
              Retake Quiz
            </button>
            <button onClick={() => navigate('/quizzes')} className="btn btn-secondary">
              Back to Quizzes
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <button
            onClick={() => navigate('/quizzes')}
            className="btn btn-secondary"
            style={{ padding: '8px' }}
          >
            <ArrowLeft size={20} />
          </button>
          <h1 style={{ color: '#333', margin: 0 }}>{quiz.title}</h1>
        </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '24px',
          padding: '16px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <div>
            Question {currentQuestion + 1} of {quiz.questions.length}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {selectedAnswers.map((answer, index) => (
              <div
                key={index}
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: answer !== -1 ? '#667eea' : '#e9ecef',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
                onClick={() => setCurrentQuestion(index)}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>

        <div className="quiz-card">
          <h3 style={{ marginBottom: '24px', color: '#333' }}>
            {currentQ.text}
          </h3>

          <div style={{ marginBottom: '32px' }}>
            {currentQ.options.map((option, index) => (
              <div
                key={index}
                className={`quiz-option ${selectedAnswers[currentQuestion] === index ? 'selected' : ''}`}
                onClick={() => handleAnswerSelect(index)}
              >
                {option}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              onClick={previousQuestion}
              disabled={currentQuestion === 0}
              className="btn btn-secondary"
              style={{ opacity: currentQuestion === 0 ? 0.5 : 1 }}
            >
              Previous
            </button>

            {isLastQuestion ? (
              <button
                onClick={finishQuiz}
                disabled={!allQuestionsAnswered}
                className="btn"
                style={{ opacity: allQuestionsAnswered ? 1 : 0.5 }}
              >
                <BarChart3 size={20} style={{ marginRight: '8px' }} />
                Finish Quiz
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                disabled={selectedAnswers[currentQuestion] === -1}
                className="btn"
                style={{ opacity: selectedAnswers[currentQuestion] !== -1 ? 1 : 0.5 }}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakeQuiz;
