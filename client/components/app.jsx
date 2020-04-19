import React from 'react';
import HeaderComponent from './header';
import GradeTableComponent from './grade-table';
import GradeFormComponent from './grade-form';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: [],
      gradeInput: this.getNewGradeInput()
    };
    this.addGrade = this.addGrade.bind(this);
    this.deleteGrade = this.deleteGrade.bind(this);
    this.editGrade = this.editGrade.bind(this);
    this.triggerEditMode = this.triggerEditMode.bind(this);
    this.updateGradeInput = this.updateGradeInput.bind(this);
    this.resetGradeInput = this.resetGradeInput.bind(this);
  }

  getNewGradeInput() {
    return {
      id: null,
      name: '',
      course: '',
      grade: ''
    };
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
        this.setState({ grades: grades, gradeInput: this.getNewGradeInput() });
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
        this.setState({ grades: newGrades, gradeInput: this.getNewGradeInput() });
      });
  }

  deleteGrade(gradeId) {
    const req = {
      method: 'DELETE'
    };
    fetch(`/api/grades/${gradeId}`, req)
      .then(() => {
        const newGrades = this.state.grades.filter(grade => grade.id !== gradeId);
        this.setState({ grades: newGrades, gradeInput: this.getNewGradeInput() });
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
        this.setState({ grades: newGrades, gradeInput: this.getNewGradeInput() });
      });
  }

  updateGradeInput(e) {
    const key = e.target.name;
    const value = e.target.value;
    const newInputs = Object.assign({}, this.state.gradeInput);
    newInputs[key] = value;
    this.setState({ gradeInput: newInputs });
  }

  resetGradeInput() {
    this.setState({ gradeInput: this.getNewGradeInput() });
  }

  triggerEditMode(grade) {
    this.setState({ gradeInput: grade });
  }

  render() {
    const gradeInput = Object.assign({}, this.state.gradeInput);

    return (
      <div className="container-fluid">
        <HeaderComponent
          gradeAverage={this.calculateAverageGrade().toString()}/>
        <div className="row">
          <GradeTableComponent
            grades={this.state.grades}
            onDelete={this.deleteGrade}
            onTriggerEditMode={this.triggerEditMode}/>
          <GradeFormComponent
            onAdd={this.addGrade}
            onEdit={this.editGrade}
            onReset={this.resetGradeInput}
            gradeInput={gradeInput}
            onChange={this.updateGradeInput} />
        </div>
      </div>
    );
  }
}

export default App;
