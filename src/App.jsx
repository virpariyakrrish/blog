import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BlogCard from './components/BlogCard';
import BlogForm from './components/BlogForm';
import { initialBlogs } from './data';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    category: '',
    description: '',
    date: '',
    imageUrl: ''
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedData = localStorage.getItem('blogs');
    if (storedData) {
      setItems(JSON.parse(storedData));
    } else {
      setItems(initialBlogs);
      localStorage.setItem('blogs', JSON.stringify(initialBlogs));
    }
    setLoading(false);
  }, []);

  const saveToLocalStorage = (newItems) => {
    localStorage.setItem('blogs', JSON.stringify(newItems));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.imageUrl) {
      alert("Please provide at least a Title and an Image URL.");
      return;
    }

    let newItems;
    if (editId) {
      newItems = items.map(item => item.id === editId ? { ...formData, id: editId } : item);
      setItems(newItems);
      setEditId(null);
    } else {
      const newItem = { ...formData, id: Date.now().toString() };
      newItems = [newItem, ...items];
      setItems(newItems);
    }
    saveToLocalStorage(newItems);
    
    setFormData({ title: '', director: '', category: '', description: '', date: '', imageUrl: '' });
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditId(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if(window.confirm("Are you sure you want to delete this blog post?")) {
      const newItems = items.filter(item => item.id !== id);
      setItems(newItems);
      saveToLocalStorage(newItems);
    }
  };

  return (
    <>
      <Navbar />
      <div className="app-container">
        
        <motion.div 
          className="sidebar-container"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <BlogForm 
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            editId={editId}
            setEditId={setEditId}
            setFormData={setFormData}
          />
        </motion.div>

        <div className="blog-list">
          {loading ? (
            <div className="message-state">Loading articles...</div>
          ) : items.length === 0 ? (
            <div className="message-state">No articles found. Create your first post!</div>
          ) : (
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.1, 1) }}
                >
                  <BlogCard 
                    item={item} 
                    onEdit={handleEdit} 
                    onDelete={handleDelete} 
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

      </div>
    </>
  );
}

export default App;
