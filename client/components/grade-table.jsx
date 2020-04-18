import React from 'react';
import GradeComponent from './grade';

class GradeTableComponent extends React.Component {
  render() {

    const gradeElements = this.props.grades.map(grade =>
      <GradeComponent key={grade.id} grade={grade} />
    );

    return (
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
    );
  }
}

export default GradeTableComponent;
