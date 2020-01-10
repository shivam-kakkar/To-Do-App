import React, { Component } from 'react'
import { Consumer } from '../context';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import classnames from 'classnames'

import "react-datepicker/dist/react-datepicker.css";

class EditTask extends Component {
  state = {
    task: '',
    startDate: '',
    time: '',
    errors : {}
  }
  // idFound = this.props.match.params;
  async componentDidMount() {
    const { id } = this.props.match.params;
    console.log(this.props.state[0].id);
    
    let i=0;
    let taskData;
    do{
      taskData = this.props.state[i];
      i++;
    }while(this.props.state[i-1].id !== id)

    console.log(taskData.time);
      this.setState({
        task: taskData.task,
        time: taskData.time
      });

  }
  onChange = e => this.setState({[e.target.name]:e.target.value});
  onTimeChange = time => this.setState({ time })
  handleChange = date => {
    this.setState({
      startDate: date
    });
  };
  onSubmit =  (dispatch,e) => {
    e.preventDefault();

    const { task, startDate, time } = this.state;

    const { id } = this.props.match.params;

    //Check For Errors
    if(task === '') {
      this.setState({errors: {task: 'Task is required'}});
        return; //Stopping the state
      }

    const updTask = {
      id,
      task,
      startDate: startDate.toString().substring(0,15),
      time
    }

    axios.post('http://localhost:8080/http://localhost:5000/updateData',updTask)
    dispatch({type: 'UPDATE_TASK',payload: updTask })

    //Clear State
    this.setState({
      task: '',
      startDate: '',
      time: ''
    })
    this.props.history.push('/');
  };
  render() {
    const { task, errors } = this.state;
    return (
      <Consumer>
        {value =>{
          const { dispatch } = value;
          return(
            <div className="card mb-3">
              <div className="card-header">
                <Link to="/"><i id="editCloseButton" className="fas fa-arrow-left fa-2x" style={{cursor: 'pointer',float: 'left', color:'black'}} /></Link>
                <p id="editTaskHeader">Edit Task</p>
              </div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <label htmlFor="task">What is to be done ?</label>
                  <input
                    name = "task"
                    type = "text"
                    className={classnames('form-control form-control-lg',{'is-invalid': errors.task})}
                    placeholder = "Enter task here"
                    value = {task}
                    onChange = {this.onChange}
                  />
                  {errors.task && <div className="invalid-feedback">{errors.task}</div> }
                  <label>Due date</label>
                  <br/>
                  <div>
                  <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                  />
                  </div>
                  <br/>
                  <div id="timepickDiv">
                  <label>Due Time</label>
                  &nbsp;&nbsp;
                    <TimePicker
                      onChange={this.onTimeChange}
                      value={this.state.time}
                      hourPlaceholder = "hh"
                      minutePlaceholder ="mm"
                    />
                  </div>
                  <input type="submit" value="Update Task" className="btn btn-dark btn-block" />
                </form>
              </div>
            </div>
          )
        }}
      </Consumer>

    )
  }
}

export default EditTask;