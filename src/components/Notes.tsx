import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import { Note, Subject } from '../types';

interface NotesProps {
  notes: Note[];
  subjects: Subject[];
  onUpdate: (id: string, updates: Partial<Note>) => void;
  onDelete: (id: string) => void;
}

const Notes: React.FC<NotesProps> = ({ notes, subjects, onUpdate, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: '', content: '', subject: '' });

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || note.subject === selectedSubject;
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
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const startEditing = (note: Note) => {
    setEditingNote(note.id);
    setEditForm({
      title: note.title,
      content: note.content,
      subject: note.subject
    });
  };

  const saveEdit = () => {
    if (editingNote && editForm.title.trim() && editForm.content.trim()) {
      onUpdate(editingNote, {
        title: editForm.title.trim(),
        content: editForm.content.trim(),
        subject: editForm.subject
      });
      setEditingNote(null);
      setEditForm({ title: '', content: '', subject: '' });
    }
  };

  const cancelEdit = () => {
    setEditingNote(null);
    setEditForm({ title: '', content: '', subject: '' });
  };

  return (
    <div className="container">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1 style={{ color: '#333' }}>My Notes</h1>
          <Link to="/create-note" className="btn">
            <Plus size={20} style={{ marginRight: '8px' }} />
            Add Note
          </Link>
        </div>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ position: 'relative' }}>
              <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d' }} />
              <input
                type="text"
                placeholder="Search notes..."
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

        {filteredNotes.length > 0 ? (
          <div className="notes-list">
            {filteredNotes.map(note => (
              <div key={note.id} className="note-item">
                {editingNote === note.id ? (
                  <div>
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                      className="form-input"
                      style={{ marginBottom: '12px' }}
                      placeholder="Note title"
                    />
                    <textarea
                      value={editForm.content}
                      onChange={(e) => setEditForm(prev => ({ ...prev, content: e.target.value }))}
                      className="form-input form-textarea"
                      style={{ marginBottom: '12px' }}
                      placeholder="Note content"
                    />
                    <select
                      value={editForm.subject}
                      onChange={(e) => setEditForm(prev => ({ ...prev, subject: e.target.value }))}
                      className="form-input"
                      style={{ marginBottom: '12px' }}
                    >
                      {subjects.map(subject => (
                        <option key={subject.id} value={subject.id}>
                          {subject.name}
                        </option>
                      ))}
                    </select>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={saveEdit} className="btn btn-sm">
                        Save
                      </button>
                      <button onClick={cancelEdit} className="btn btn-secondary btn-sm">
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="note-title">{note.title}</div>
                    <div className="note-content">{note.content}</div>
                    <div className="note-meta">
                      <span>{getSubjectName(note.subject)}</span>
                      <span>Updated: {formatDate(note.updatedAt)}</span>
                    </div>
                    <div className="note-actions">
                      <button
                        onClick={() => startEditing(note)}
                        className="btn btn-secondary btn-sm"
                      >
                        <Edit size={16} style={{ marginRight: '4px' }} />
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(note.id)}
                        className="btn btn-danger btn-sm"
                      >
                        <Trash2 size={16} style={{ marginRight: '4px' }} />
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">📝</div>
            <p>
              {searchTerm || selectedSubject !== 'all' 
                ? 'No notes match your search criteria.' 
                : 'No notes yet. Create your first note to get started!'
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
              <Link to="/create-note" className="btn" style={{ marginTop: '16px' }}>
                Create Note
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
