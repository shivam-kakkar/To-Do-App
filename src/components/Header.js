import React from 'react';
import { Link } from 'react-router-dom'

class Header extends React.Component{
  render(){
    return(
      <div id="header" className="navbar navbar-expand-sm navbar-dark bg-dark pr-0 py-0">
        <div className="container">
            <a id="title" href="/" className="navbar-brand">
              TO DO APP
            </a>
            <Link to="/" className="navbar-brand">
              <i className="fas fa-home">Home</i>
            </Link>
        </div>
      </div>
    )
  }
}

export default Header;