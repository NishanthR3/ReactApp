import React, { Component } from 'react';
import './NewPerson.css';
import GoogleLogin from './GoogleLogin';
import FacebookLogin from './FacebookLogin';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        name: "",
        password: "",
      },
      data: [],
      submitted: 0,
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit (event) {
    event.preventDefault();
    const request = new Request('http://127.0.0.1:8080/user/' + this.state.formData.name);
    await fetch(request)
      .then(response => response.json())
        .then(data => {
          this.setState({data: data})})
        .catch(error =>
          this.setState({submitted : 1})
        );
    if(this.state.data.password && this.state.data.password === this.state.formData.password){
      sessionStorage.setItem('user',this.state.formData.name);
      sessionStorage.setItem('isAuth',1);
      if(this.state.data.admin == true) sessionStorage.setItem('isAdmin',1);
      this.props.history.push('/Home');
      window.location.reload();
    }
    else
      this.setState({submitted : 1});
  }

  handleNameChange(event) {
    this.state.formData.name = event.target.value;
  }
  handlePasswordChange(event) {
    this.state.formData.password = event.target.value;
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Login</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control"
                value={this.state.name} onChange={this.handleNameChange}/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={this.state.password} onChange={this.handlePasswordChange}/>
            </div>
            <div className="form-group">
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
          <GoogleLogin />
          <FacebookLogin />
        </div>
        {(this.state.submitted == 1) &&
          <div>
            <h2>
              Login unsuccessful.
            </h2>
          </div>
        }

      </div>
    );
  }
}

export default Login;
