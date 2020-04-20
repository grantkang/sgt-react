import React from 'react';
import HeaderComponent from './header';
import GradeTableComponent from './grade-table';
import GradeFormComponent from './grade-form';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: [],
      grade: null
    };
    this.addGrade = this.addGrade.bind(this);
    this.deleteGrade = this.deleteGrade.bind(this);
    this.editGrade = this.editGrade.bind(this);
    this.setGrade = this.setGrade.bind(this);
    this.resetGrade = this.resetGrade.bind(this);
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
        this.setState({ grades: grades, grade: null });
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
        this.setState({ grades: newGrades, grade: null });
      });
  }

  deleteGrade(gradeId) {
    const req = {
      method: 'DELETE'
    };
    fetch(`/api/grades/${gradeId}`, req)
      .then(() => {
        const newGrades = this.state.grades.filter(grade => grade.id !== gradeId);
        this.setState({ grades: newGrades, grade: null });
      });
  }

  editGrade(gradeToBeEdited) {
    const req = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(gradeToBeEdited)
    };
    fetch(`/api/grades/${gradeToBeEdited.id}`, req)
      .then(response => response.json())
      .then(editedGrade => {
        const newGrades = this.state.grades.map(grade => {
          return grade.id === editedGrade.id ? editedGrade : grade;
        });
        this.setState({ grades: newGrades, grade: null });
      });
  }

  resetGrade() {
    this.setState({ grade: null });
  }

  setGrade(grade) {
    this.setState({ grade: grade });
  }

  render() {
    const grade = Object.assign({}, this.state.grade);

    return (
      <div className="container-fluid">
        <HeaderComponent
          gradeAverage={this.calculateAverageGrade().toString()}/>
        <div className="row">
          <GradeTableComponent
            grades={this.state.grades}
            onDelete={this.deleteGrade}
            onTriggerEditMode={this.setGrade}/>
          <GradeFormComponent
            onAdd={this.addGrade}
            onEdit={this.editGrade}
            onReset={this.resetGrade}
            grade={grade} />
        </div>
      </div>
    );
  }
}

export default App;
