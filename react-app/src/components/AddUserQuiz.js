import React, { Component } from 'react';
import './ViewPeople.css';
import QuizQuestions from './QuizQuestions'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';


class AddQuizes extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        userName: "",
        quizName: "",
        genre: "",
        score:0,
      },
      data: [],
      added: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
    fetch('http://localhost:8080/userquizes', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300){
          sessionStorage.setItem('quiz',this.state.formData.quizName);
          this.props.history.push('/QuizQuestions');
        }
        else if(response.status === 401){
          this.setState({added: 2});
          sessionStorage.setItem('quiz',this.state.formData.quizName);
          this.props.history.push('/QuizQuestions');
        }
      });
  }

  handleClick(event){
      this.state.formData.userName = sessionStorage.getItem("user");
      this.state.formData.quizName = event.target.value;
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
              <th>Give Quiz</th>
            </tr>
          </thead>
            <tbody>{this.state.data.map((item,key) => {
               return (
                      <tr key = {key}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.genre}</td>
                        <td><button type="submit" value={item.name} onClick={(event) =>{
                          this.state.formData.userName = sessionStorage.getItem("user");
                          this.state.formData.quizName = event.target.value;
                          this.state.formData.genre = item.genre;
                        }}
                            className="btn btn-default">GiveQuiz</button></td>
                      </tr>
                  )
                })}
            </tbody>
        </table>
        </form>
        {this.state.added === 2 &&
            <div>
              <h2>
                Attempted quiz.
              </h2>
            </div>
        }
      </div>
    );
  }
}

export default AddQuizes;
