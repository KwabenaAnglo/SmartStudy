import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Subject } from '../types';

interface CreateNoteProps {
  subjects: Subject[];
  onSubmit: (note: { title: string; content: string; subject: string }) => void;
}

const CreateNote: React.FC<CreateNoteProps> = ({ subjects, onSubmit }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    subject: subjects[0]?.id || ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        title: formData.title.trim(),
        content: formData.content.trim(),
        subject: formData.subject
      });
      navigate('/notes');
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <button
            onClick={() => navigate('/notes')}
            className="btn btn-secondary"
            style={{ padding: '8px' }}
          >
            <ArrowLeft size={20} />
          </button>
          <h1 style={{ color: '#333', margin: 0 }}>Create New Note</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className={`form-input ${errors.title ? 'error' : ''}`}
              placeholder="Enter note title..."
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
              onChange={(e) => handleChange('subject', e.target.value)}
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
            <label className="form-label">Content *</label>
            <textarea
              value={formData.content}
              onChange={(e) => handleChange('content', e.target.value)}
              className={`form-input form-textarea ${errors.content ? 'error' : ''}`}
              placeholder="Write your note content here..."
              rows={10}
            />
            {errors.content && (
              <div style={{ color: '#dc3545', fontSize: '14px', marginTop: '4px' }}>
                {errors.content}
              </div>
            )}
            <div style={{ fontSize: '12px', color: '#6c757d', marginTop: '4px' }}>
              {formData.content.length} characters
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
            <button type="submit" className="btn">
              <Save size={20} style={{ marginRight: '8px' }} />
              Save Note
            </button>
            <button
              type="button"
              onClick={() => navigate('/notes')}
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

export default CreateNote;
