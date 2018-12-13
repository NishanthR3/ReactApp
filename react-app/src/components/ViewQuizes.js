import React, { Component } from 'react';
import './ViewPeople.css';

class ViewQuizes extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/quizes/');
    fetch(request)
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
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.genre}</td>
                  </tr>
                )
             })}
          </tbody>
       </table>
      </div>
    );
  }
}

export default ViewQuizes;
