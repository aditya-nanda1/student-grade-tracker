import React, { Component } from 'react';

class AddStudentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      grade: '',
      error: ''
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, grade } = this.state;

    if (!name || !grade) {
      this.setState({ error: 'Please fill in all fields' });
      return;
    }

    const gradeNum = Number(grade);
    if (isNaN(gradeNum) || gradeNum < 0 || gradeNum > 100) {
      this.setState({ error: 'Grade must be a number between 0 and 100' });
      return;
    }

    const status = gradeNum > 34 ? 'Passed' : 'Failed';
    this.props.onAddStudent({ name, grade: gradeNum, status });
    this.setState({ name: '', grade: '', error: '' });
  };

  render() {
    const { name, grade, error } = this.state;

    return (
      <div className="add-student-form">
        <h2>Add New Student</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
              placeholder="Enter student name (e.g., Rahul)"
            />
          </div>
          <div className="form-group">
            <label>Grade:</label>
            <input
              type="number"
              name="grade"
              value={grade}
              onChange={this.handleChange}
              placeholder="Enter grade (0-100)"
            />
          </div>
          <button type="submit">Add Student</button>
        </form>
      </div>
    );
  }
}

export default AddStudentForm;
