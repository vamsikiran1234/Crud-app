// components/AddUserForm.js
import React, { useState, useEffect } from 'react';

function AddUserForm({ onSubmit, onCancel, initialData }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    registerNumber: '',
    email: ''
  });
  const [focused, setFocused] = useState({
    id: false,
    name: false,
    registerNumber: false,
    email: false
  });

  // If initialData is provided (for editing), populate the form
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFocus = (field) => {
    setFocused({
      ...focused,
      [field]: true
    });
  };

  const handleBlur = (field) => {
    setFocused({
      ...focused,
      [field]: false
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="form-container card-effect">
      <div className="form-header">
        <div className="form-title">
          <span className="form-icon">{initialData ? '✏️' : '➕'}</span>
          <h3>{initialData ? 'Update User' : 'Add User'}</h3>
        </div>
        <button className="btn-close" onClick={onCancel}>×</button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className={`form-group ${focused.id ? 'focused' : ''}`}>
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            onFocus={() => handleFocus('id')}
            onBlur={() => handleBlur('id')}
            placeholder="Enter ID"
            required
            disabled={initialData}
            className="animated-input"
          />
          <span className="focus-border"></span>
        </div>
        
        <div className={`form-group ${focused.name ? 'focused' : ''}`}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onFocus={() => handleFocus('name')}
            onBlur={() => handleBlur('name')}
            placeholder="Enter Name"
            required
            className="animated-input"
          />
          <span className="focus-border"></span>
        </div>
        
        <div className={`form-group ${focused.registerNumber ? 'focused' : ''}`}>
          <label htmlFor="registerNumber">Register Number:</label>
          <input
            type="text"
            id="registerNumber"
            name="registerNumber"
            value={formData.registerNumber}
            onChange={handleChange}
            onFocus={() => handleFocus('registerNumber')}
            onBlur={() => handleBlur('registerNumber')}
            placeholder="Enter Register Number"
            required
            className="animated-input"
          />
          <span className="focus-border"></span>
        </div>
        
        <div className={`form-group ${focused.email ? 'focused' : ''}`}>
          <label htmlFor="email">Email ID:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={() => handleFocus('email')}
            onBlur={() => handleBlur('email')}
            placeholder="Enter Email ID"
            required
            className="animated-input"
          />
          <span className="focus-border"></span>
        </div>
        
        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onCancel}>
            <span className="btn-icon">✕</span> Cancel
          </button>
          <button type="submit" className="btn-submit">
            <span className="btn-icon">{initialData ? '✓' : '+'}</span> {initialData ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddUserForm;

