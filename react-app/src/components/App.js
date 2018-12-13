import React, { Component } from 'react';
import Login from './Login';
import Logout from './Logout';
import GoogleLogin from './GoogleLogin';
import FacebookLogin from './FacebookLogin';
import NewPerson from './NewPerson';
import Home from './Home';
import NewQuiz from './NewQuiz';
import DeletePerson from './DeletePerson';
import DeleteQuestions from './DeleteQuestions';
import DeleteQuiz from './DeleteQuiz';
import ViewPeople from './ViewPeople';
import AddQuizes from './AddUserQuiz';
import ViewQuizes from './ViewQuizes';
import AttemptedQuizes from './AttemptedQuizes';
import QuizQuestions from './QuizQuestions';
import AddQuestions from './AddQuestions';
import GiveQuiz from './GiveQuiz';
import UpdateQuestions from './UpdateQuestions';
import LeaderBoard from './LeaderBoard'
import GenreLeaderBoard from './GenreLeaderBoard';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends Component {

  componentDidMount() {
    localStorage.setItem('didLogin',0);
    sessionStorage.setItem('isAuth' , 0);
    sessionStorage.setItem('isAdmin' , 0);
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            { (sessionStorage.getItem('isAuth') == null || sessionStorage.getItem('isAuth') == 0) &&
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link className="navbar-brand" to={'/'}>React App</Link>
                </div>
                <ul className="nav navbar-nav">
                  <li><Link to={'/NewPerson'}>Register</Link></li>
                  <li><Link to={'/Login'}>Login</Link></li>
                </ul>
              </div>
            </nav>
            }
            { ((sessionStorage.getItem('isAdmin') == 1) && (sessionStorage.getItem('isAuth') == 1)) &&
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link className="navbar-brand" to={'/Home'}>{sessionStorage.getItem('user')}</Link>
                </div>
                <ul className="nav navbar-nav">
                  <li><Link to={'/DeletePerson'}>Delete Person</Link></li>
                  <li><Link to={'/ViewPeople'}>View People</Link></li>
                  <li><Link to={'/NewQuiz'}>Create Quiz</Link></li>
                  <li><Link to={'/ViewQuizes'}>View Quizes</Link></li>
                  <li><Link to={'/GiveQuiz'}>Delete Quiz Questions</Link></li>
                  <li><Link to={'/DeleteQuiz'}>Delete Quiz</Link></li>
                  <li><Link to={'/AddQuizes'}>Attempt Quiz</Link></li>
                  <li><Link to={'/AttemptedQuizes'}>Attempted Quizes</Link></li>
                  <li><Link to={'/LeaderBoard'}>Leader Board</Link></li>
                  <li><Link to={'/GenreLeaderBoard'}>Genre Leader Board</Link></li>
                  <li><Link to={'/AddQuestions'}>Add Questions</Link></li>
                  <li><Link to={'/UpdateQuestions'}>Update Questions</Link></li>
                  <li><Link to={'/Logout'}>Logout</Link></li>
                </ul>
              </div>
            </nav>
            }
            { ((sessionStorage.getItem('isAdmin') == 0) && (sessionStorage.getItem('isAuth') == 1)) &&
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link className="navbar-brand" to={'/Home'}>{sessionStorage.getItem('user')}</Link>
                </div>
                <ul className="nav navbar-nav">
                  <li><Link to={'/AddQuizes'}>Give Quiz</Link></li>
                  <li><Link to={'/AttemptedQuizes'}>Attempted Quizes</Link></li>
                  <li><Link to={'/ViewQuizes'}>View Quizes</Link></li>
                  <li><Link to={'/LeaderBoard'}>Leader Board</Link></li>
                  <li><Link to={'/GenreLeaderBoard'}>Genre Leader Board</Link></li>
                  <li><Link to={'/Logout'}>Logout</Link></li>
                </ul>
              </div>
            </nav>
            }
            <Switch>
                 <Route exact path='/Home' component={Home} />
                 <Route exact path='/NewPerson' component={NewPerson} />
                 <Route exact path='/NewQuiz' component={NewQuiz} />
                 <Route exact path='/Login' component={Login} />
                 <Route exact path='/Logout' component={Logout} />
                 <Route exact path='/GoogleLogin' component={GoogleLogin} />
                 <Route exact path='/FacebookLogin' component={FacebookLogin} />
                 <Route exact path='/DeletePerson' component={DeletePerson} />
                 <Route exact path='/DeleteQuiz' component={DeleteQuiz} />
                 <Route exact path='/ViewPeople' component={ViewPeople} />
                 <Route exact path='/AddQuizes' component={AddQuizes} />
                 <Route exact path='/ViewQuizes' component={ViewQuizes} />
                 <Route exact path='/GiveQuiz' component={GiveQuiz} />
                 <Route exact path='/AttemptedQuizes' component={AttemptedQuizes} />
                 <Route exact path='/QuizQuestions' component={QuizQuestions} />
                 <Route exact path='/AddQuestions' component={AddQuestions} />
                 <Route exact path='/UpdateQuestions' component={UpdateQuestions} />
                 <Route exact path='/LeaderBoard' component={LeaderBoard} />
                 <Route exact path='/GenreLeaderBoard' component={GenreLeaderBoard} />
                 <Route exact path='/DeleteQuestions' component={DeleteQuestions} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
