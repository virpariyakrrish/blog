import React from 'react';
import { Calendar, User, Edit, Trash2 } from 'lucide-react';

const BlogCard = ({ item, onEdit, onDelete }) => {
  return (
    <div className="blog-card">
      <img src={item.imageUrl} alt={item.title} className="card-image" />
      <div className="card-content">
        <span className="card-category">{item.category}</span>
        <h3 className="card-title">{item.title}</h3>
        <p className="card-description">{item.description}</p>
        
        <div className="card-footer">
          <div className="author-info">
            <User size={16} />
            <span>{item.director || 'Anonymous'}</span>
          </div>
          <div className="author-info">
            <Calendar size={16} />
            <span>{item.date ? new Date(item.date).toLocaleDateString() : 'No date'}</span>
          </div>
        </div>

        <div className="card-actions">
          <button className="btn-icon btn-edit" onClick={() => onEdit(item)}>
            <Edit size={16} /> Edit
          </button>
          <button className="btn-icon btn-delete" onClick={() => onDelete(item.id)}>
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
