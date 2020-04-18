import React from 'react';

class GradeComponent extends React.Component {
  render() {
    const gradeData = this.props.grade;
    const onDelete = this.props.onDelete;
    return (
      <tr>
        <td>{gradeData.name}</td>
        <td>{gradeData.course}</td>
        <td>{gradeData.grade}</td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => onDelete(gradeData.id)}>
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default GradeComponent;
