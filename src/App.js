// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import AddUserForm from './components/AddUserForm';
import StudentTable from './components/StudentTable';
import ViewStudent from './components/ViewStudent';

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [viewingStudent, setViewingStudent] = useState(null);
  const [deletedStudent, setDeletedStudent] = useState(null);
  const [undoTimer, setUndoTimer] = useState(null);

  useEffect(() => {
    // Fetch initial data from JSONPlaceholder
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        // Transform the data to match our schema
        const transformedData = data.slice(0, 5).map(user => ({
          id: user.id,
          name: user.name,
          registerNumber: `REG${user.id}${Math.floor(Math.random() * 10000)}`,
          email: user.email
        }));
        setStudents(transformedData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const addStudent = (student) => {
    if (editingStudent) {
      // Update existing student
      setStudents(students.map(s => s.id === student.id ? student : s));
      setEditingStudent(null);
    } else {
      // Add new student
      const newId = Math.max(...students.map(s => s.id), 0) + 1;
      const newStudent = { ...student, id: newId };
      
      // Simulate POST request
      fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify(newStudent),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then(response => response.json())
        .then(() => {
          setStudents([...students, newStudent]);
        })
        .catch(error => console.error('Error adding student:', error));
    }
    setShowAddForm(false);
  };

  const updateStudent = (student) => {
    setEditingStudent(student);
    setShowAddForm(true);
  };

  const deleteStudent = (id) => {
    // Find the student to be deleted
    const studentToDelete = students.find(s => s.id === id);
    
    // Remove the student from the list
    setStudents(students.filter(s => s.id !== id));
    
    // Set the deleted student for potential undo
    setDeletedStudent(studentToDelete);
    
    // Clear any existing timer
    if (undoTimer) clearTimeout(undoTimer);
    
    // Set a new timer for 5 seconds
    const timer = setTimeout(() => {
      setDeletedStudent(null);
    }, 5000);
    
    setUndoTimer(timer);
    
    // Simulate DELETE request
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'DELETE',
    }).catch(error => console.error('Error deleting student:', error));
  };

  const undoDelete = () => {
    if (deletedStudent) {
      // Add the deleted student back to the list
      setStudents([...students, deletedStudent]);
      
      // Clear the deleted student and timer
      setDeletedStudent(null);
      if (undoTimer) clearTimeout(undoTimer);
      setUndoTimer(null);
    }
  };

  const viewStudent = (student) => {
    setViewingStudent(student);
  };

  const closeView = () => {
    setViewingStudent(null);
  };

  return (
    <div className="app">
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>
      
      <header className="app-header">
        <div className="logo">
          <span className="logo-icon">⚡</span>
          <h1>CRUD Operations</h1>
        </div>
        <div className="theme-toggle">
          <span className="theme-label">Theme</span>
          <button className="theme-button" onClick={() => document.body.classList.toggle('dark-theme')}>
            <span className="toggle-icon">☀️</span>
          </button>
        </div>
      </header>
      
      <main className="app-main">
        <div className="container">
          <div className="section-header">
            <h2>Student Details</h2>
            {!showAddForm && !viewingStudent && (
              <button className="btn-add pulse" onClick={() => setShowAddForm(true)}>
                <span className="btn-icon">+</span>
                <span className="btn-text">Add User</span>
              </button>
            )}
          </div>
          
          {deletedStudent && (
            <div className="undo-notification">
              <div className="notification-content">
                <span className="notification-icon">🗑️</span>
                <span>Student deleted successfully!</span>
              </div>
              <button className="btn-undo" onClick={undoDelete}>
                <span className="undo-icon">↩️</span> Undo
              </button>
            </div>
          )}
          
          <div className="content-area">
            {showAddForm ? (
              <AddUserForm 
                onSubmit={addStudent} 
                onCancel={() => {
                  setShowAddForm(false);
                  setEditingStudent(null);
                }} 
                initialData={editingStudent}
              />
            ) : viewingStudent ? (
              <ViewStudent student={viewingStudent} onClose={closeView} />
            ) : (
              <StudentTable 
                students={students} 
                loading={loading}
                onUpdate={updateStudent}
                onDelete={deleteStudent}
                onView={viewStudent}
              />
            )}
          </div>
        </div>
      </main>
      
      <footer className="app-footer">
        <p>Data provided by JSONPlaceholder API • CRUD Operations Demo</p>
      </footer>
    </div>
  );
}

export default App;