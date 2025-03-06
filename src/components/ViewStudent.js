
// components/ViewStudent.js
import React from 'react';

function ViewStudent({ student, onClose }) {
  return (
    <div className="view-container">
      <h3>Student Details</h3>
      <div className="student-details">
        <div className="detail-group">
          <span className="label">ID:</span>
          <span className="value">{student.id}</span>
        </div>
        <div className="detail-group">
          <span className="label">Name:</span>
          <span className="value">{student.name}</span>
        </div>
        <div className="detail-group">
          <span className="label">Register Number:</span>
          <span className="value">{student.registerNumber}</span>
        </div>
        <div className="detail-group">
          <span className="label">Email ID:</span>
          <span className="value">{student.email}</span>
        </div>
      </div>
      <button className="btn-back" onClick={onClose}>
        Back to List
      </button>
    </div>
  );
}

export default ViewStudent;