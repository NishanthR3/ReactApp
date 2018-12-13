import React, { Component } from 'react';
import './ViewPeople.css';

class LeaderBoard extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  async componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/userquizes/');
    await fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">View All Quizes</h1>
        </header>

        <table className="table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Quiz</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
              if(item.username == sessionStorage.getItem('user'))
               return (
                  <tr key = {key} bgcolor='#FF0000'>
                      <td>{item.id}</td>
                      <td>{item.username}</td>
                      <td>{item.quizname}</td>
                      <td>{item.score}</td>
                  </tr>
                )
            else
            return (
               <tr key = {key}>
                   <td>{item.id}</td>
                   <td>{item.username}</td>
                   <td>{item.quizname}</td>
                   <td>{item.score}</td>
               </tr>
             )
            })}
          </tbody>
       </table>
      </div>
    );
  }
}

export default LeaderBoard;
