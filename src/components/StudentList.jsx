import React, { Component } from 'react';
import StudentItem from './StudentItem';

class StudentList extends Component {
  render() {
    const { students } = this.props;

    return (
      <div className="student-list">
        <h2>Student List</h2>
        {students.length === 0 ? (
          <p>No students found.</p>
        ) : (
          students.map((student) => (
            <StudentItem
              key={student.id}
              student={student}
              onDelete={this.props.onDeleteStudent}
              onUpdate={this.props.onUpdateStudent}
            />
          ))
        )}
      </div>
    );
  }
}

export default StudentList;
