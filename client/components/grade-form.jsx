import React from 'react';

class GradeFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentName: '',
      course: '',
      grade: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleChange(e) {
    const input = {};
    input[e.target.name] = e.target.value;
    this.setState(input);
  }

  handleSubmit(e) {
    e.preventDefault();
    const newGrade = {
      name: this.state.studentName,
      course: this.state.course,
      grade: Number.parseInt(this.state.grade)
    };
    this.props.onSubmit(newGrade);
    this.resetState();
  }

  handleReset(e) {
    e.preventDefault();
    this.resetState();
  }

  resetState() {
    this.setState({
      studentName: '',
      course: '',
      grade: ''
    });
  }

  render() {
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
              name="studentName"
              value={this.state.studentName}
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
          <button type="submit" className="btn btn-primary">Add</button>
          <button type="reset" className="btn btn-secondary">Cancel</button>
        </form>
      </div>

    );
  }
}

export default GradeFormComponent;
