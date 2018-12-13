import React, { Component } from 'react';
import './DeletePerson.css';

class DeletePerson extends Component {

  constructor() {
    super();
    this.state = {
      formData: [],
      data: [],
      submitted: false,
    }
    this.handleOptionChange = this.handleOptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:8080/users/' + this.state.formData[0], {
     method: 'DELETE',
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          this.setState({submitted: true});
          else {
            console.log(this.state.formData);
            console.log(response.status);
          }
      });
  }

  handleOptionChange(event) {
    this.state.formData.push(event.target.value);
    console.log(event.target.value);
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/users/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Delete a Person</h1>
        </header>

        <form onSubmit={this.handleSubmit}>
        <table className="table-hover">
          <thead>
            <tr>
              <th>Checked</th>
              <th>ID</th>
              <th>Name</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map((item, key) => {
              return (
                  <tr key = {key}>
                      <td>
                      <div className="form-group">
                      <input type="radio" name="sameGroup" value={item.id} onChange={this.handleOptionChange} className="form-control"/>
                      </div>
                      </td>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.password}</td>
                  </tr>
                )
             })}
          </tbody>
       </table>
       <div>
       <button type="submit" className="btn btn-default">Submit</button>
       </div>
       </form>
       {this.state.submitted &&
         <div>
           <h2>
             Person successfully deleted.
           </h2>
         </div>
       }
      </div>
    );
  }
}

export default DeletePerson;
