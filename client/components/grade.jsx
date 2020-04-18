import React from 'react';

class GradeComponent extends React.Component {
  render() {
    const gradeData = this.props.grade;
    return (
      <tr>
        <td>{gradeData.name}</td>
        <td>{gradeData.course}</td>
        <td>{gradeData.grade}</td>
      </tr>
    );
  }
}

export default GradeComponent;
