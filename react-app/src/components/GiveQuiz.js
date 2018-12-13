import React, { Component } from 'react';
import './ViewPeople.css';
import QuizQuestions from './QuizQuestions'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';


class GiveQuiz extends Component {
  constructor() {
    super();
    this.state = {
      quizName: "",
      data: [],
      added: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/quizes/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  handleSubmit(event){
    event.preventDefault();
    sessionStorage.setItem('quiz',this.state.quizName);
    this.props.history.push('/DeleteQuestions');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Contests</h1>
        </header>

        <form onSubmit={this.handleSubmit}>
        <table className="table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Genre</th>
              <th>Choose Quiz</th>
            </tr>
          </thead>
            <tbody>{this.state.data.map((item,key) => {
               return (
                      <tr key = {key}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.genre}</td>
                        <td><button type="submit" value={item.name} onClick={(event) =>{
                          this.state.quizName = event.target.value;
                        }}
                            className="btn btn-default">Choose Quiz</button></td>
                      </tr>
                  )
                })}
            </tbody>
        </table>
        </form>
      </div>
    );
  }
}

export default GiveQuiz;
