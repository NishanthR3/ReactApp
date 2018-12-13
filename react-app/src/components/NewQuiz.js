import React, { Component } from 'react';
import './NewPerson.css';

class NewQuiz extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        name: "",
        genre: "",
      },
      submitted: 0,
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleGenreChange = this.handleGenreChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:8080/quizes', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          this.setState({submitted: 1});
        else if(response.status === 401)
            this.setState({submitted: 2});
      });
  }

  handleNameChange(event) {
    this.state.formData.name = event.target.value;
  }
  handleGenreChange(event) {
    this.state.formData.genre = event.target.value;
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Create a New Quiz</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" value={this.state.name} onChange={this.handleNameChange}/>
            </div>
            <div className="form-group">
                <label>Genre</label>
                <input type="text" className="form-control" value={this.state.genre} onChange={this.handleGenreChange}/>
            </div>
            <div className="form-group">
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>

        {this.state.submitted === 1 &&
          <div>
            <h2>
              New Quiz successfully added.
            </h2>
             This has been printed using conditional rendering.
          </div>
        }
        {this.state.submitted === 2 &&
          <div>
            <h2>
              Quiz already exists.
            </h2>
             This has been printed using conditional rendering.
          </div>
        }
      </div>
    );
  }
}

export default NewQuiz;
