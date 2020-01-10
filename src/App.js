import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider, Consumer } from './context';
import './App.css';
import Header from './components/Header';
import Show from './components/Show';
import AddTask from './components/AddTask';
import NotFound from './components/NotFound';
import EditContact from './components/EditTask';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  render(){
    return (
      <Provider>
        <Router>
          <div id="appcontainer">
            <Header/>
              <div id="wrapper">
                <Switch>
                  <Route exact path="/" component={Show} />
                  <Route exact path="/task/add" component={AddTask} />
                  <Consumer>
                    {value=>{
                      const { Tasks } = value;
                      return(
                        <div>
                          <Route exact path="/task/edit/:id" render={(props) => <EditContact {...props} state={Tasks}/>}  />
                        </div>
                      )
                    }}
                  </Consumer>
                  <Route component={NotFound} />
                </Switch>
              </div>
          </div>
        </Router>
      </Provider>

    );
  }
}

export default App;
