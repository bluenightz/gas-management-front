import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router'
import { toggleMenu } from '../../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { basePath } from '../../config';

class Topbar extends Component {


	constructor( props ){
		super( props )

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		e.preventDefault();

		this.props.toggleMenu();
	}

	render() {
		return (
			
	        <nav className="header navbar">
	          <div className="header-inner">
	            <div className="navbar-item navbar-spacer-right brand hidden-lg-up">

	              <a href="#" onClick={ e => e.preventDefault() } data-toggle="sidebar" onClick={this.handleClick} className="toggle-offscreen">
	                <i className="material-icons">menu</i>
	              </a>


	              <a className="brand-logo hidden-xs-down">
	                <img src={basePath('/assets/images/logo_white.png')} alt="logo"/>
	              </a>

	            </div>
	            <a className="navbar-item navbar-spacer-right navbar-heading hidden-md-down" href="#">
	              <span></span>
	            </a>

	            <div className="navbar-item nav navbar-nav">
	              <div className="nav-item nav-link dropdown">
	                <a href="#" onClick={ e => e.preventDefault() } className="dropdown-toggle" data-toggle="dropdown">
	                  <span>แจ้งเตือน</span>
	                  <i className="material-icons">notifications</i>
	                  <span className="tag tag-danger">4</span>
	                </a>
	                <div className="dropdown-menu dropdown-menu-right notifications">
	                  <div className="dropdown-item">
	                    <div className="notifications-wrapper">
	                      <ul className="notifications-list">
	                        <li>
	                          <a href="#" onClick={ e => e.preventDefault() }>
	                            <div className="notification-icon">
	                              <div className="circle-icon bg-success text-white">
	                                <i className="material-icons">arrow_upward</i>
	                              </div>
	                            </div>
	                            <div className="notification-message">
	                              <b>Sean</b>
	                              launched a new application
	                              <span className="time">2 seconds ago</span>
	                            </div>
	                          </a>
	                        </li>
	                        <li>
	                          <a href="#" onClick={ e => e.preventDefault() }>
	                            <div className="notification-icon">
	                              <div className="circle-icon bg-danger text-white">
	                                <i className="material-icons">check</i>
	                              </div>
	                            </div>
	                            <div className="notification-message">
	                              <b>Removed calendar</b>
	                              from app list
	                              <span className="time">4 hours ago</span>
	                            </div>
	                          </a>
	                        </li>
	                        <li>
	                          <a href="#" onClick={ e => e.preventDefault() }>
	                            <span className="notification-icon">
	                              <span className="circle-icon bg-info text-white">J</span>
	                            </span>
	                            <div className="notification-message">
	                              <b>Jack Hunt</b>
	                              has
	                              <b>joined</b>
	                              mailing list
	                              <span className="time">9 days ago</span>
	                            </div>
	                          </a>
	                        </li>
	                        <li>
	                          <a href="#" onClick={ e => e.preventDefault() }>
	                            <span className="notification-icon">
	                              <span className="circle-icon bg-primary text-white">C</span>
	                            </span>
	                            <div className="notification-message">
	                              <b>Conan Johns</b>
	                              created a new list
	                              <span className="time">9 days ago</span>
	                            </div>
	                          </a>
	                        </li>
	                      </ul>
	                    </div>
	                    <div className="notification-footer">Notifications</div>
	                  </div>
	                </div>
	              </div>
	            </div>
	          </div>
	        </nav>
		)
	}
}


function mapStateToProps(state) {
	return {
		// gasList: state.gasList,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		// getGasList, setReplaceGas
		toggleMenu,
	}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Topbar))
