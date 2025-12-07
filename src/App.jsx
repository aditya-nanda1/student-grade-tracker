import React, { Component } from 'react';
import StudentList from './components/StudentList';
import AddStudentForm from './components/AddStudentForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      filterType: 'all', // all, passed, failed
      sortType: 'default' // default, grade-asc, grade-desc
    };
    console.log('App constructor called');
  }

  componentDidMount() {
    console.log('App componentDidMount called');
    // Simulate fetching data
    const initialStudents = [
      { id: 1, name: 'Aditya Nanda', grade: 100, status: 'Passed' },
      { id: 2, name: 'Aarav Patel', grade: 85, status: 'Passed' },
      { id: 3, name: 'Ishaan Sharma', grade: 42, status: 'Passed' },
      { id: 4, name: 'Ananya Gupta', grade: 92, status: 'Passed' },
      { id: 5, name: 'Rohan Verma', grade: 30, status: 'Failed' },
      { id: 6, name: 'Priya Singh', grade: 78, status: 'Passed' },
      { id: 7, name: 'Vikram Malhotra', grade: 55, status: 'Passed' },
      { id: 8, name: 'Neha Kapoor', grade: 88, status: 'Passed' },
      { id: 9, name: 'Siddharth Rao', grade: 25, status: 'Failed' },
      { id: 10, name: 'Kavita Reddy', grade: 95, status: 'Passed' }
    ];

    this.setState({ students: initialStudents });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('App componentDidUpdate called');
    if (prevState.students !== this.state.students) {
      console.log('Student list updated');
    }
  }

  componentWillUnmount() {
    console.log('App componentWillUnmount called');
  }

  addStudent = (student) => {
    const newStudent = {
      ...student,
      id: Date.now(),
      status: student.grade > 34 ? 'Passed' : 'Failed'
    };
    this.setState((prevState) => ({
      students: [...prevState.students, newStudent]
    }));
  };

  deleteStudent = (id) => {
    this.setState((prevState) => ({
      students: prevState.students.filter((student) => student.id !== id)
    }));
  };

  updateStudent = (id, updatedData) => {
    this.setState((prevState) => ({
      students: prevState.students.map((student) =>
        student.id === id ? { ...student, ...updatedData, status: updatedData.grade > 34 ? 'Passed' : 'Failed' } : student
      )
    }));
  };

  handleFilterChange = (e) => {
    this.setState({ filterType: e.target.value });
  };

  handleSortChange = (e) => {
    this.setState({ sortType: e.target.value });
  };

  getProcessedStudents = () => {
    const { students, filterType, sortType } = this.state;
    let processed = [...students];

    // Filter
    if (filterType === 'passed') {
      processed = processed.filter(s => s.grade > 34);
    } else if (filterType === 'failed') {
      processed = processed.filter(s => s.grade <= 34);
    }

    // Sort
    if (sortType === 'grade-asc') {
      processed.sort((a, b) => a.grade - b.grade);
    } else if (sortType === 'grade-desc') {
      processed.sort((a, b) => b.grade - a.grade);
    }

    return processed;
  };

  render() {
    const processedStudents = this.getProcessedStudents();

    return (
      <div className="app-container">
        <h1>Student Grade Tracker</h1>
        <AddStudentForm onAddStudent={this.addStudent} />

        <div className="controls">
          <div className="control-group">
            <label>Filter:</label>
            <select value={this.state.filterType} onChange={this.handleFilterChange}>
              <option value="all">All</option>
              <option value="passed">Passed</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          <div className="control-group">
            <label>Sort by Grade:</label>
            <select value={this.state.sortType} onChange={this.handleSortChange}>
              <option value="default">Default</option>
              <option value="grade-asc">Low to High</option>
              <option value="grade-desc">High to Low</option>
            </select>
          </div>
        </div>

        <StudentList
          students={processedStudents}
          onDeleteStudent={this.deleteStudent}
          onUpdateStudent={this.updateStudent}
        />
      </div>
    );
  }
}

export default App;
