import React from 'react';
import HeaderComponent from './header';
import GradeTableComponent from './grade-table';
import GradeFormComponent from './grade-form';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { grades: [] };
    this.addGrade = this.addGrade.bind(this);
  }

  calculateAverageGrade() {
    const grades = this.state.grades;
    if (!grades.length) return 0;
    const sum = grades.reduce((acc, grade) => acc + grade.grade, 0);
    const average = Math.round(sum / grades.length);
    return average;
  }

  componentDidMount() {
    this.getAllGrades();
  }

  getAllGrades() {
    fetch('/api/grades')
      .then(response => response.json())
      .then(grades => {
        this.setState({ grades: grades });
      });
  }

  addGrade(newGrade) {
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newGrade)
    };
    fetch('/api/grades', req)
      .then(response => response.json())
      .then(grade => {
        const newGrades = this.state.grades.concat(grade);
        this.setState({ grades: newGrades });
      });
  }

  render() {
    return (
      <div className="container-fluid">
        <HeaderComponent gradeAverage={this.calculateAverageGrade().toString()}/>
        <div className="row">
          <GradeTableComponent grades={this.state.grades} />
          <GradeFormComponent onSubmit={this.addGrade}/>
        </div>
      </div>
    );
  }
}

export default App;
