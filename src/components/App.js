import React, { Component } from 'react';
import { Link } from 'react-router';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <h1><code>Create React App Parse Redux</code></h1>
          <p>A somewhat hefty boiler plate using create-react-app with a Parse backend</p>
        </header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </nav>
        {this.props.children}
        <footer>
          <p><a href="https://github.com/zebapy/create-react-app-parse-redux">View on GitHub</a></p>
        </footer>
      </div>
    );
  }
}

export default App;
