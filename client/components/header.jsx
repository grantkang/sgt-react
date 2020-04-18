import React from 'react';

class HeaderComponent extends React.Component {

  render() {
    return (
      <header className="d-flex align-items-center justify-content-between">
        <h1>Student Grade Table</h1>
        <div className="average-grade-display">
          <span>Average Grade </span>
          <span className="badge badge-secondary">{this.props.gradeAverage}</span>
        </div>
      </header>
    );
  }
}

export default HeaderComponent;
