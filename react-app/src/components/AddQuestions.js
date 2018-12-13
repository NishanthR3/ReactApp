import React, { Component } from 'react';
import './ViewPeople.css';

class AddQuestions extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        name: "",
        quizname: "",
        aoption: "",
        aanswer: false,
        boption: "",
        banswer: false,
        coption: "",
        canswer: false,
        doption: "",
        danswer: false
      },
      data: [],
      submitted : 0
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleQuiz = this.handleQuiz.bind(this);
    this.handleAoption = this.handleAoption.bind(this);
    this.handleBoption = this.handleBoption.bind(this);
    this.handleCoption = this.handleCoption.bind(this);
    this.handleDoption = this.handleDoption.bind(this);
    this.handleAanswer = this.handleAanswer.bind(this);
    this.handleBanswer = this.handleBanswer.bind(this);
    this.handleCanswer = this.handleCanswer.bind(this);
    this.handleDanswer = this.handleDanswer.bind(this);
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure

  handleSubmit(event){
    event.preventDefault();
    fetch('http://localhost:8080/question', {
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
  handleName(event) {
    this.state.formData.name = event.target.value;
  }
  handleQuiz(event) {
    this.state.formData.quizname = event.target.value;
  }
  handleAoption(event) {
    this.state.formData.aoption = event.target.value;
  }
  handleBoption(event) {
    this.state.formData.boption = event.target.value;
  }
  handleCoption(event) {
    this.state.formData.coption = event.target.value;
  }
  handleDoption(event) {
    this.state.formData.doption = event.target.value;
  }
  handleAanswer(event) {
    this.state.formData.aanswer = !(this.state.formData.aanswer);
  }
  handleBanswer(event) {
    this.state.formData.banswer = !(this.state.formData.banswer);
  }
  handleCanswer(event) {
    this.state.formData.canswer = !(this.state.formData.canswer);
  }
  handleDanswer(event) {
    this.state.formData.danswer = !(this.state.formData.danswer);
  }

  render() {
    return (
            <div>
                    <form onSubmit={this.handleSubmit}>
                    <table className="table-hover">
                    <tbody>
                    <div className="formContainer">
                          <tr>
                          <td></td>
                          <td><label><h2>Quiz</h2></label></td>
                          <td><textarea value={this.state.quizname} onChange={this.handleQuiz}/></td>
                          </tr>
                          <tr>
                          <td></td>
                          <td><label><h2>Question</h2></label></td>
                          <td><textarea value={this.state.name} onChange={this.handleName}/></td>
                          </tr>
                          <tr>
                          <td><input type="checkbox" onChange={this.handleAanswer}/></td>
                          <td><label><h2>Aoption</h2></label></td>
                          <td><textarea value={this.state.aoption} onChange={this.handleAoption}/></td>
                          </tr>
                          <tr>
                          <td><input type="checkbox" onChange={this.handleBanswer}/></td>
                          <td><label><h2>Boption</h2></label></td>
                          <td><textarea value={this.state.boption} onChange={this.handleBoption}/></td>
                          </tr>
                          <tr>
                          <td><input type="checkbox" onChange={this.handleCanswer}/></td>
                          <td><label><h2>Coption</h2></label></td>
                          <td><textarea value={this.state.coption} onChange={this.handleCoption}/></td>
                          </tr>
                          <tr>
                          <td><input type="checkbox" onChange={this.handleDanswer}/></td>
                          <td><label><h2>Doption</h2></label></td>
                          <td><textarea value={this.state.doption} onChange={this.handleDoption}/></td>
                          </tr>
                          <tr>
                          <td></td>
                          <td></td>
                          <td><button type="submit" className="btn btn-default"><h1>Add</h1></button></td>
                          </tr>
                    </div>
                    </tbody>
                    </table>
                    </form>
                    { this.state.submitted == 1 &&
                      <div>
                          Question added
                      </div>
                    }
            </div>
    );
  }
}

export default AddQuestions;
