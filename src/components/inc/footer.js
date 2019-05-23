import React, { Component } from 'react'

export default class Footer extends Component {
	render() {
		return (
			<div className="content-footer">
	            <nav className="footer-right">
	              <ul className="nav">
	                <li>
	                  <a href="#" onClick={ e => e.preventDefault() }>Feedback</a>
	                </li>
	              </ul>
	            </nav>
	            <nav className="footer-left">
	              <ul className="nav">
	                <li>
	                  <a href="#" onClick={ e => e.preventDefault() }>
	                    <span>Copyright</span>
	                    &copy; 2016 Your App
	                  </a>
	                </li>
	                <li className="hidden-md-down">
	                  <a href="#" onClick={ e => e.preventDefault() }>Privacy</a>
	                </li>
	                <li className="hidden-md-down">
	                  <a href="#" onClick={ e => e.preventDefault() }>Terms</a>
	                </li>
	                <li className="hidden-md-down">
	                  <a href="#" onClick={ e => e.preventDefault() }>help</a>
	                </li>
	              </ul>
	            </nav>
	          </div>

		)
	}
}