import React from 'react';
import GradeComponent from './grade';

class GradeTableComponent extends React.Component {

  emptyTableMessage() {
    const grades = this.props.grades;
    return grades.length === 0 ? <span>No grades recorded</span> : null;
  }

  render() {
    const grades = this.props.grades;
    const gradeElements = grades.map(grade =>
      <GradeComponent
        key={grade.id}
        grade={grade}
        onDelete={this.props.onDelete}
        onTriggerEditMode={this.props.onTriggerEditMode}/>
    );
    return (
      <div className="col-lg-9">
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Student Name</th>
              <th scope="col">Course</th>
              <th scope="col">Grade</th>
              <th scope="col">Operations</th>
            </tr>
          </thead>
          <tbody>
            {gradeElements}
          </tbody>
        </table>
        {this.emptyTableMessage()}
      </div>
    );
  }
}

export default GradeTableComponent;
