import React, {Component} from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
  switch(action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        Tasks: [...state.Tasks,action.payload]
      }
    case 'UPDATE_TASK':
      return {
        ...state,
        Tasks: state.Tasks.map(Task => Task.id === action.payload.id
          ? (Task = action.payload)
          : Task
        )
      }
    case 'DELETE_TASK':
      return {
        ...state,
        Tasks: state.Tasks.filter(
          Task => Task.id !== action.payload
        )
      };
    default:
      return state;
  }
}

export class Provider extends Component {
  state= {
    Tasks: [],
    dispatch: action => this.setState(state => reducer(state, action))
  }

  async componentDidMount() {
    const res = await axios.post('http://localhost:8080/http://localhost:5000/sendData')
    
      this.setState({Tasks: res.data});
  }
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export const Consumer = Context.Consumer;