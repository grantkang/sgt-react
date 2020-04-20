import React from 'react';

class GradeFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      id: null,
      name: '',
      course: '',
      grade: ''
    };
  }

  handleChange(e) {
    const input = {};
    input[e.target.name] = e.target.value;
    this.setState(input);
  }

  handleSubmit(e) {
    e.preventDefault();
    const newGrade = {
      id: parseInt(this.state.id),
      name: this.state.name,
      course: this.state.course,
      grade: parseInt(this.state.grade)
    };

    if (this.isEditing()) {
      this.props.onEdit(newGrade);
    } else {
      this.props.onAdd(newGrade);
    }
  }

  handleReset(e) {
    e.preventDefault();
    this.props.onReset();
  }

  componentDidUpdate(prevProps) {
    const newGrade = this.props.grade;
    if (this.props.grade !== prevProps.grade) {
      if (Object.keys(newGrade).length !== 0) {
        this.setState({
          id: newGrade.id,
          name: newGrade.name,
          course: newGrade.course,
          grade: newGrade.grade
        });
      } else {
        this.setState({
          id: null,
          name: '',
          course: '',
          grade: ''
        });
      }
    }
  }

  isEditing() {
    return Object.keys(this.props.grade).length !== 0;
  }

  render() {
    const submitButtonClassName = !this.isEditing() ? 'btn btn-primary' : 'btn btn-success';
    const submitButtonTextContent = !this.isEditing() ? 'Add' : 'Edit';
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
              value={this.state.name}
              onChange={this.handleChange}/>
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
              value={this.state.course}
              onChange={this.handleChange}/>
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
              value={this.state.grade}
              onChange={this.handleChange}/>
          </div>
          <button type="submit" className={submitButtonClassName}>{submitButtonTextContent}</button>
          <button type="reset" className="btn btn-secondary">Cancel</button>
        </form>
      </div>

    );
  }
}

export default GradeFormComponent;
