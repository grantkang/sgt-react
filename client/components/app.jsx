import React from 'react';
import HeaderComponent from './header';
import GradeTableComponent from './grade-table';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { grades: [] };

  }

  componentDidMount() {
    fetch('/api/grades')
      .then(response => response.json())
      .then(grades => {
        this.setState({ grades: grades });
      });
  }

  getAverageGrade() {
    const grades = this.state.grades;
    if (!grades.length) return 0;
    const sum = grades.reduce((acc, grade) => acc + grade.grade, 0);
    const average = Math.round(sum / grades.length);
    return average;
  }

  render() {
    return (
      <div className="container-fluid">
        <HeaderComponent gradeAverage={this.getAverageGrade().toString()}/>
        <GradeTableComponent grades={this.state.grades} />
      </div>
    );
  }
}

export default App;
