import React from 'react';

class GradeComponent extends React.Component {
  render() {
    const gradeData = this.props.grade;
    return (
      <tr>
        <td>{gradeData.name}</td>
        <td>{gradeData.grade}</td>
        <td>{gradeData.course}</td>
      </tr>
    );
  }
}

export default GradeComponent;
