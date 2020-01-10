import React from 'react';
import { Link } from 'react-router-dom';
import ToDoTask from './ToDoTask';
import { Consumer } from '../context';

class List extends React.Component{
  render(){
    return(
      <Consumer>
        {value => {
          const { Tasks } = value;
          return(
            <div id="list">
              <div id="listContent">
                {Tasks.map(Task => (
                  <ToDoTask key={Task.id} Task={Task} />
                ))}
              </div>
              <Link to="/task/add"><button className="btn btn-dark btn-block taskButton">+ Add a Task</button></Link>
            </div>
          )
        }}
      </Consumer>

    )
  }
}

export default List;