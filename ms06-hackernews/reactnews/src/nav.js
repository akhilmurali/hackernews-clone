import React,{Component} from 'react';
import './nav.css'
import {  Link  } from 'react-router-dom';

class Nav extends Component{
    render(){
        return(
            <div id="nav">
                <div>
                <div className="topics navdiv">
                    <ul className="hackertopics">
                       <li className="hackericon">Y</li>
                        <li className="toplist"><strong><Link to="/HackerContent">Hacker News</Link></strong></li>
                        <li className="toplist"><Link to="/NewsContent">news</Link></li>
                        <li className="toplist"><Link to="/CommitContent">comments</Link></li>
                        <li className="toplist"><Link to="/ShowContent">show</Link></li>
                        <li className="toplist"><Link to="/AskContent">ask</Link></li>
                        <li className="toplist"><Link to="/JobContent">jobs</Link></li>
                        <li className="toplist"><Link to="/SubmitContent">submit</Link></li>
                    </ul>
                </div>
                <div className="login navdiv">Login</div>
               </div>
            </div>
        )
    }
}
export default Nav;