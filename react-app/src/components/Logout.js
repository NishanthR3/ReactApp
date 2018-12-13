import React, { Component } from 'react';
import './NewPerson.css';

class Logout extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
      sessionStorage.removeItem('user');
      sessionStorage.setItem('isAuth',0);
      sessionStorage.setItem('isAdmin',0);
      this.props.history.push('/');
      window.location.reload();
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Logout</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
                <button type="submit" className="btn btn-default">Logout</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Logout;
