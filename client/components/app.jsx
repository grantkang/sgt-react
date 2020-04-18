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

  render() {
    return (
      <div className="container-fluid">
        <HeaderComponent />
        <GradeTableComponent grades={this.state.grades} />
      </div>
    );
  }
}

export default App;
