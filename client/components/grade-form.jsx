import React from 'react';

class GradeFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const gradeInput = this.props.gradeInput;
    const newGrade = {
      id: parseInt(gradeInput.id),
      name: gradeInput.name,
      course: gradeInput.course,
      grade: parseInt(gradeInput.grade)
    };
    if (this.isCurrentlyEditing()) {
      this.props.onEdit(newGrade);
    } else {
      this.props.onAdd(newGrade);
    }
  }

  handleReset(e) {
    e.preventDefault();
    this.props.onReset();
  }

  isCurrentlyEditing() {
    return this.props.gradeInput.id !== null;
  }

  render() {
    const gradeInput = this.props.gradeInput;
    const submitButtonClassName = !this.isCurrentlyEditing() ? 'btn btn-primary' : 'btn btn-success';
    const submitButtonTextContent = !this.isCurrentlyEditing() ? 'Add' : 'Edit';
    return (
      <div className="col-lg-3">
        <form onSubmit={this.handleSubmit} onReset={this.handleReset}>
          <div className="form-group grade-form-group">
            <label htmlFor="student-name-input">
              <i className="fas fa-user"></i>
            </label>
            <input
              type="text"
              className="form-control"
              id="student-name-input"
              placeholder="Enter name"
              name="name"
              value={gradeInput.name}
              onChange={this.props.onChange}/>
          </div>
          <div className="form-group grade-form-group">
            <label htmlFor="course-input">
              <i className="far fa-list-alt"></i>
            </label>
            <input
              type="text"
              className="form-control"
              id="course-input"
              placeholder="Enter course name"
              name="course"
              value={gradeInput.course}
              onChange={this.props.onChange}/>
          </div>
          <div className="form-group grade-form-group">
            <label htmlFor="grade-input">
              <i className="fas fa-graduation-cap"></i>
            </label>
            <input
              type="text"
              className="form-control"
              id="grade-input"
              placeholder="Enter grade"
              name="grade"
              value={gradeInput.grade}
              onChange={this.props.onChange}/>
          </div>
          <button type="submit" className={submitButtonClassName}>{submitButtonTextContent}</button>
          <button type="reset" className="btn btn-secondary">Cancel</button>
        </form>
      </div>

    );
  }
}

export default GradeFormComponent;
