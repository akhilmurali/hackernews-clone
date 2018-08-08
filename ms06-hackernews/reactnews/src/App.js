import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';     
import Nav from './nav.js'
import CommitContent from './commitContent.js'
import NewsContent from './newsContent.js'
import ShowContent from './showContent.js'
import HackerContent from './hackercontent.js'
import AskContent from './askContent.js'
import SubmitContent from './submitcontent.js'
import JobContent from './jobcontent.js'
import PageFooter from './pagefooter.js'
import { BrowserRouter as Router, Route, Link  } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
        <div>
          <ul>
                <li><Link to="/"></Link></li>
                <li><Link to="/AskContent"></Link></li>
                <li><Link to="/JobContent"></Link></li>
                <li><Link to="/NewdContent"></Link></li>
                <li><Link to="/CommitContent"></Link></li>
                <li><Link to="/ShowContent"></Link></li>
                <li><Link to="/HackerContent"></Link></li>
                </ul>
              </div>
              <Route exact path = "/" component = {Nav} />
              <Route path = "/" component = {SubmitContent} />
              <Route path = "/AskContent" component = {AskContent} />
              <Route path = "/JobContent" component = {JobContent} />
              <Route path = "/HackerContent" component = {HackerContent} />
              <Route path = "/NewsContent" component = {NewsContent} />
              <Route path = "/ShowContent" component = {ShowContent} />
              <Route path = "/CommitContent" component = {CommitContent} />
              <Route exact path = "/" component = {PageFooter} />
              
        </div>
      </Router>
    );
  }
}

export default App;
