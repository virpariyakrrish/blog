import React from 'react';
import { PenTool } from 'lucide-react';

const BlogForm = ({ formData, handleInputChange, handleSubmit, editId, setEditId, setFormData }) => {
  const handleCancel = () => {
    setEditId(null);
    setFormData({ title: '', director: '', category: '', description: '', date: '', imageUrl: '' });
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">
        <PenTool size={20} />
        {editId ? 'Edit Article' : 'Publish New Article'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Article Title</label>
          <input type="text" name="title" className="form-input" placeholder="e.g., The Future of AI" value={formData.title} onChange={handleInputChange} required />
        </div>
        
        <div className="form-group">
          <label className="form-label">Author Name</label>
          <input type="text" name="director" className="form-input" placeholder="e.g., John Doe" value={formData.director} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label className="form-label">Category</label>
          <input type="text" name="category" className="form-input" placeholder="e.g., Technology" value={formData.category} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label className="form-label">Image URL</label>
          <input type="url" name="imageUrl" className="form-input" placeholder="https://..." value={formData.imageUrl} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label className="form-label">Publish Date</label>
          <input type="date" name="date" className="form-input" value={formData.date} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label className="form-label">Short Description</label>
          <textarea name="description" className="form-textarea" placeholder="Write a brief excerpt..." value={formData.description} onChange={handleInputChange}></textarea>
        </div>
        
        <button type="submit" className="btn-submit">
          {editId ? 'Update Article' : 'Publish Article'}
        </button>

        {editId && (
          <div className="cancel-edit">
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Cancel Editing
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default BlogForm;
