import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2, X } from 'lucide-react';
import { Subject, Question } from '../types';

interface CreateQuizProps {
  subjects: Subject[];
  onSubmit: (quiz: { title: string; subject: string; questions: Omit<Question, 'id'>[] }) => void;
}

const CreateQuiz: React.FC<CreateQuizProps> = ({ subjects, onSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    subject: subjects[0]?.id || ''
  });
  const [questions, setQuestions] = useState<Array<{
    text: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }>>([
    {
      text: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: ''
    }
  ]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }
    
    if (questions.length === 0) {
      newErrors.questions = 'At least one question is required';
    }
    
    questions.forEach((question, index) => {
      if (!question.text.trim()) {
        newErrors[`question_${index}_text`] = `Question ${index + 1} text is required`;
      }
      
      if (question.options.some(option => !option.trim())) {
        newErrors[`question_${index}_options`] = `Question ${index + 1} must have 4 options`;
      }
      
      if (question.options.filter(option => option.trim()).length < 2) {
        newErrors[`question_${index}_options`] = `Question ${index + 1} must have at least 2 options`;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const quizQuestions = questions.map(q => ({
        text: q.text.trim(),
        options: q.options.map(opt => opt.trim()).filter(opt => opt),
        correctAnswer: q.correctAnswer,
        explanation: q.explanation.trim()
      }));
      
      onSubmit({
        title: formData.title.trim(),
        subject: formData.subject,
        questions: quizQuestions
      });
      navigate('/quizzes');
    }
  };

  const addQuestion = () => {
    setQuestions(prev => [...prev, {
      text: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: ''
    }]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(prev => prev.filter((_, i) => i !== index));
    }
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    setQuestions(prev => prev.map((q, i) => 
      i === index ? { ...q, [field]: value } : q
    ));
  };

  const updateOption = (questionIndex: number, optionIndex: number, value: string) => {
    setQuestions(prev => prev.map((q, i) => 
      i === questionIndex 
        ? { ...q, options: q.options.map((opt, j) => j === optionIndex ? value : opt) }
        : q
    ));
  };

  const addOption = (questionIndex: number) => {
    setQuestions(prev => prev.map((q, i) => 
      i === questionIndex 
        ? { ...q, options: [...q.options, ''] }
        : q
    ));
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    setQuestions(prev => prev.map((q, i) => 
      i === questionIndex 
        ? { ...q, options: q.options.filter((_, j) => j !== optionIndex) }
        : q
    ));
  };

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
          <h1 style={{ color: '#333', margin: 0 }}>Create New Quiz</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Quiz Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className={`form-input ${errors.title ? 'error' : ''}`}
              placeholder="Enter quiz title..."
              maxLength={100}
            />
            {errors.title && (
              <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '4px' }}>
                {errors.title}
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Subject *</label>
            <select
              value={formData.subject}
              onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
              className={`form-input ${errors.subject ? 'error' : ''}`}
            >
              <option value="">Select a subject</option>
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
            {errors.subject && (
              <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '4px' }}>
                {errors.subject}
              </div>
            )}
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <label className="form-label">Questions *</label>
              <button
                type="button"
                onClick={addQuestion}
                className="btn btn-secondary btn-sm"
              >
                <Plus size={16} style={{ marginRight: '4px' }} />
                Add Question
              </button>
            </div>
            
            {errors.questions && (
              <div style={{ color: '#dc3545', fontSize: '14px', marginBottom: '16px' }}>
                {errors.questions}
              </div>
            )}

            {questions.map((question, questionIndex) => (
              <div key={questionIndex} style={{ 
                border: '2px solid #e9ecef', 
                borderRadius: '12px', 
                padding: '20px', 
                marginBottom: '20px',
                backgroundColor: '#f8f9fa'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h4 style={{ margin: 0, color: '#333' }}>Question {questionIndex + 1}</h4>
                  {questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQuestion(questionIndex)}
                      className="btn btn-danger btn-sm"
                      style={{ padding: '4px 8px' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Question Text *</label>
                  <textarea
                    value={question.text}
                    onChange={(e) => updateQuestion(questionIndex, 'text', e.target.value)}
                    className={`form-input form-textarea ${errors[`question_${questionIndex}_text`] ? 'error' : ''}`}
                    placeholder="Enter your question..."
                    rows={3}
                  />
                  {errors[`question_${questionIndex}_text`] && (
                    <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '4px' }}>
                      {errors[`question_${questionIndex}_text`]}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Options *</label>
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
                      <input
                        type="radio"
                        name={`correct_${questionIndex}`}
                        checked={question.correctAnswer === optionIndex}
                        onChange={() => updateQuestion(questionIndex, 'correctAnswer', optionIndex)}
                        style={{ margin: 0 }}
                      />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => updateOption(questionIndex, optionIndex, e.target.value)}
                        className="form-input"
                        placeholder={`Option ${optionIndex + 1}`}
                        style={{ flex: 1 }}
                      />
                      {question.options.length > 2 && (
                        <button
                          type="button"
                          onClick={() => removeOption(questionIndex, optionIndex)}
                          className="btn btn-danger btn-sm"
                          style={{ padding: '4px 8px' }}
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                  {errors[`question_${questionIndex}_options`] && (
                    <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '4px' }}>
                      {errors[`question_${questionIndex}_options`]}
                    </div>
                  )}
                  {question.options.length < 6 && (
                    <button
                      type="button"
                      onClick={() => addOption(questionIndex)}
                      className="btn btn-secondary btn-sm"
                      style={{ marginTop: '8px' }}
                    >
                      <Plus size={16} style={{ marginRight: '4px' }} />
                      Add Option
                    </button>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Explanation (Optional)</label>
                  <textarea
                    value={question.explanation}
                    onChange={(e) => updateQuestion(questionIndex, 'explanation', e.target.value)}
                    className="form-input form-textarea"
                    placeholder="Explain why this answer is correct..."
                    rows={2}
                  />
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
            <button type="submit" className="btn">
              <Save size={20} style={{ marginRight: '8px' }} />
              Create Quiz
            </button>
            <button
              type="button"
              onClick={() => navigate('/quizzes')}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;
