import React from 'react';

class GradeComponent extends React.Component {
  render() {
    const gradeData = this.props.grade;
    const onDelete = this.props.onDelete;
    const onTriggerEditMode = this.props.onTriggerEditMode;
    return (
      <tr>
        <td>{gradeData.name}</td>
        <td>{gradeData.course}</td>
        <td>{gradeData.grade}</td>
        <td>
          <button
            className="btn btn-danger mx-2"
            onClick={() => onDelete(gradeData.id)}>
            Delete
          </button>
          <button
            className="btn btn-success mx-2"
            onClick={() => onTriggerEditMode(gradeData)}>
            Edit
          </button>
        </td>
      </tr>
    );
  }
}

export default GradeComponent;
