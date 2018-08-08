import React,{Component} from 'react';
import './pagefooter.css'

class PageFooter extends Component{
    render(){
        return(
            <div className="footer">
                <div className="disblock">
                    <ul className="footerstuff">
                        <li className="putborder">Guidlines</li>
                        <li className="putborder">FAQ</li>
                        <li className="putborder">Support</li>
                        <li className="putborder">API</li>
                        <li className="putborder">Secuirity</li>
                        <li className="putborder">Lists</li>
                        <li className="putborder">Bookmarklet</li>
                        <li className="putborder">Legal</li>
                        <li className="putborder">Apply to YC</li>
                        <li>Contact</li>
                    </ul>
                </div><br></br>
                <div>
                <p className="footer_search">Search</p>
                <input type="text" className="footerinp"/>
                </div>
                
            </div>
        )
    }
}
export default PageFooter;