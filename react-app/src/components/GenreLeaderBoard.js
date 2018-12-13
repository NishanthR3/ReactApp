import React, { Component } from 'react';
import './ViewPeople.css';

class GenreLeaderBoard extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      formData : [],
      genre:""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  async componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/genre/');
    await fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
    const request1 = new Request('http://127.0.0.1:8080/userquizes/');
    await fetch(request1)
      .then(response => response.json())
        .then(data => this.setState({formData: data}));
    await this.setState({genre : this.state.data[0].genre});
  }

  handleSubmit (event) {
    event.preventDefault();
    console.log(event.target.value);
        window.localStorage.setItem('check',event.target.value);
    this.setState({genre : event.target.value});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">View Genre LeaderBoard</h1>
        </header>
        <select className="form-control" onChange={this.handleSubmit}>
        {this.state.data.map((item) => {
               return (
                  <option value = {item.genre} onChange={this.handleSubmit}> {item.genre}</option>
                )
             })}
        </select>
      <table className="table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quiz</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>{this.state.formData.map((item, key) => {
            if((item.genre == this.state.genre) && (item.username == sessionStorage.getItem('user')))
             return (
                <tr key = {key} bgcolor='#FF0000'>
                    <td>{item.id}</td>
                    <td>{item.username}</td>
                    <td>{item.quizname}</td>
                    <td>{item.score}</td>
                </tr>
              )
          else if(item.genre == this.state.genre)
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

export default GenreLeaderBoard;
