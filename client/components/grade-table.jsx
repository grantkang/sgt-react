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
      <GradeComponent key={grade.id} grade={grade} />
    );
    return (
      <div className="col-lg-9">
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Student Name</th>
              <th scope="col">Course</th>
              <th scope="col">Grade</th>
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
