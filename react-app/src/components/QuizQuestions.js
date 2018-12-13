import React, { Component } from 'react';
import './ViewPeople.css';

class QuizQuestions extends Component {
  constructor() {
    super();
    this.state = {
      format: {
        id: 0,
        aanswer: false,
        banswer: false,
        canswer: false,
        danswer: false
      },
      data: [],
      givenAnswers: [],
      powerup1 : 0,
      powerup2 : 0,
      check: false,
      score: 0,
      done: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createForm = this.createForm.bind(this);
    this.handleAanswer = this.handleAanswer.bind(this);
    this.handleBanswer = this.handleBanswer.bind(this);
    this.handleCanswer = this.handleCanswer.bind(this);
    this.handleDanswer = this.handleDanswer.bind(this);
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure

  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/questions/' + sessionStorage.getItem('quiz'));
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  createForm() {
    for(let i = 0;i < this.state.data.length;i ++){
        this.state.givenAnswers.push({
          aanswer: false,
          banswer: false,
          canswer: false,
          danswer: false,
        });
      }
  }

  async handleSubmit(event) {
    event.preventDefault();
    await this.setState({score : 0});
    for(let i = 1;i < this.state.data.length;i ++)
      if((this.state.data[i].aanswer == this.state.givenAnswers[i].aanswer) &&
         (this.state.data[i].banswer == this.state.givenAnswers[i].banswer) &&
         (this.state.data[i].canswer == this.state.givenAnswers[i].canswer) &&
         (this.state.data[i].danswer == this.state.givenAnswers[i].danswer))
         await this.setState({score : this.state.score+1});
      else
          await this.setState({check : true});

    if(this.state.powerup1 == 1) {
      await this.setState({score : this.state.score+1});
      //await this.setState({powerup1 : 0});
    }
    if(this.state.powerup2 == 1){
      if(!this.state.check)
        await this.setState({score : 2 * this.state.score});
      else
        await this.setState({score : this.state.score / 2});
      await this.setState({check : false});
      //await this.setState({powerup2 : 0});
    }
    await this.setState({done : true});
    await fetch('http://localhost:8080/score/' + sessionStorage.getItem('quiz') + '/' + sessionStorage.getItem('user'), {
     method: 'PUT',
     body: JSON.stringify({
       username :sessionStorage.getItem('user'),
	     quizname : sessionStorage.getItem('quiz'),
	     score : this.state.score
     }),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          this.setState({submitted: true});
      });
  }

  handleAanswer(event) {
      this.state.givenAnswers[event.target.value].aanswer = event.target.checked;
  }
  handleBanswer(event) {
      this.state.givenAnswers[event.target.value].banswer = event.target.checked;
  }
  handleCanswer(event) {
      this.state.givenAnswers[event.target.value].canswer = event.target.checked;
  }
  handleDanswer(event) {
      this.state.givenAnswers[event.target.value].danswer = event.target.checked;
  }

  render() {
    console.log(this.state.powerup1);
    {this.createForm()}
    return (
            <div>
                    <h1>{sessionStorage.getItem('quiz')}</h1>
                    <form onSubmit={this.handleSubmit}>
                    <table className="table-hover" border = "0">
                      <tbody>{this.state.data.map((item, key) => {
                        if(!(key == 0) || !(this.state.powerup1 == 1))
                         return (
                            <tr key = {key}>
                                <td>{item.id}</td>
                                <td>
                                  <div>
                                    { (() => {
                                        if(item.name.startsWith("https") || item.name.startsWith("http"))
                                          return (<img src = {item.name} width="120" height="120"/>);
                                        else
                                          return (<div>{item.name}</div>);
                                      })()
                                    }
                                    <br />
                                    <input type="checkbox" value={key} onChange={this.handleAanswer}/>
                                    {item.aoption}<br />
                                    <input type="checkbox" value={key} onChange={this.handleBanswer}/>
                                    {item.boption}<br />
                                    <input type="checkbox" value={key} onChange={this.handleCanswer}/>
                                    {item.coption}<br />
                                    <input type="checkbox" value={key} onChange={this.handleDanswer}/>
                                    {item.doption}
                                  </div>
                                </td>
                            </tr>
                          )
                         })}
                    <td><button type="submit" className="btn btn-default">Submit</button></td>
                    <td><button type="submit" className="btn btn-default" onClick= {(event) => {
                          this.state.powerup1 = 1;
                          this.state.powerup2 = 0;
                    }}>Free Score</button>
                    <button type="submit" className="btn btn-default" onClick= {(event) => {
                        this.state.powerup1 = 0;
                        this.state.powerup2 = 1;
                    }}>Double Risk</button>
                    <button type="submit" className="btn btn-default" onClick= {(event) => {
                        this.state.powerup1 = 0;
                        this.state.powerup2 = 0;
                    }}>Remove Power</button></td>
                    </tbody>
                    </table>
                  </form>
                  { this.state.done &&
                  <h1>Your Score is {this.state.score} </h1>
                }
            </div>
    );
  }
}

export default QuizQuestions;
