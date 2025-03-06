// components/StudentTable.js
import React, { useState } from 'react';

function StudentTable({ students, loading, onUpdate, onDelete, onView }) {
  const [hoverRowId, setHoverRowId] = useState(null);
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-text">Loading student data...</div>
      </div>
    );
  }

  return (
    <div className="table-container card-effect">
      {students.length === 0 ? (
        <div className="no-data">
          <div className="no-data-icon">📋</div>
          <p>No students found. Add a new student to get started.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="student-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Register Number</th>
                <th>Email ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr 
                  key={student.id} 
                  className={hoverRowId === student.id ? 'highlight' : ''}
                  onMouseEnter={() => setHoverRowId(student.id)}
                  onMouseLeave={() => setHoverRowId(null)}
                >
                  <td><span className="id-badge">{student.id}</span></td>
                  <td>{student.name}</td>
                  <td><span className="register-number">{student.registerNumber}</span></td>
                  <td>
                    <span className="email-address">
                      <span className="email-icon">✉️</span>
                      {student.email}
                    </span>
                  </td>
                  <td className="actions">
                    <button 
                      className="btn-action btn-view tooltip" 
                      onClick={() => onView(student)}
                    >
                      <span className="tooltip-text">View Details</span>
                      <span className="action-icon">👁️</span>
                    </button>
                    <button 
                      className="btn-action btn-update tooltip" 
                      onClick={() => onUpdate(student)}
                    >
                      <span className="tooltip-text">Update User</span>
                      <span className="action-icon">✏️</span>
                    </button>
                    <button 
                      className="btn-action btn-delete tooltip" 
                      onClick={() => onDelete(student.id)}
                    >
                      <span className="tooltip-text">Delete User</span>
                      <span className="action-icon">🗑️</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StudentTable;

