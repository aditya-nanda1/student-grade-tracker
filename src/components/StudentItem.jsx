import React, { Component } from 'react';

class StudentItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      editGrade: props.student.grade
    };
  }

  handleEdit = () => {
    this.setState({ isEditing: true });
  };

  handleSave = () => {
    console.log('handleSave called');
    const { student, onUpdate } = this.props;
    const { editGrade } = this.state;
    const gradeNum = Number(editGrade);

    console.log('editGrade:', editGrade, typeof editGrade);
    console.log('gradeNum:', gradeNum, typeof gradeNum);

    if (!isNaN(gradeNum) && gradeNum >= 0 && gradeNum <= 100) {
      console.log('Updating student:', student.id, gradeNum);
      onUpdate(student.id, { grade: gradeNum });
      this.setState({ isEditing: false }, () => console.log('isEditing set to false'));
    } else {
      console.log('Validation failed');
      alert('Please enter a valid grade (0-100)');
    }
  };

  handleCancel = () => {
    this.setState({
      isEditing: false,
      editGrade: this.props.student.grade
    });
  };

  handleChange = (e) => {
    console.log('handleChange:', e.target.value);
    this.setState({ editGrade: e.target.value });
  };

  render() {
    const { student, onDelete } = this.props;
    const { name, grade, status } = student;
    const { isEditing, editGrade } = this.state;

    return (
      <div className="student-item">
        <span className="student-name">{name}</span>

        {isEditing ? (
          <div className="edit-controls">
            <input
              type="number"
              value={editGrade}
              onChange={this.handleChange}
              className="edit-input"
            />
            <button onClick={this.handleSave} className="save-btn">Save</button>
            <button onClick={this.handleCancel} className="cancel-btn">Cancel</button>
          </div>
        ) : (
          <>
            <span className="student-grade">Grade: {grade}</span>
            <span className={`student-status ${status.toLowerCase()}`}>{status}</span>
            <div className="actions">
              <button onClick={this.handleEdit} className="edit-btn">Edit</button>
              <button
                className="delete-btn"
                onClick={() => onDelete(student.id)}
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default StudentItem;
