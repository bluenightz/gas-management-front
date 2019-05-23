import React, { Component, Fragment } from 'react'
import { getMaterialList, changeValidStatus, toggleMenu } from '../../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { getUserInfo } from '../../utils/user_helper'
import Auth from '../../utils/authService'
import { basePath } from '../../config';

class Sidebar extends Component {

	constructor(props) {
		super(props)

		this.state = {
			userInfo: getUserInfo()
		}
		this.auth = new Auth();
		this.handleClick = this.handleClick.bind(this);
	}

	logout() {
		this.auth.logout();
	}

	handleClick(e) {
		e.preventDefault();

		this.props.toggleMenu();
	}

	render() {
		return (
			<Fragment>
		      <div className="off-canvas-overlay" onClick={this.handleClick} data-toggle="sidebar"></div>
		      <div className="sidebar-panel">
		        <div className="brand">
		          <a href="#" onClick={ e => e.preventDefault() } onClick={this.handleClick} data-toggle="sidebar" className="toggle-offscreen hidden-lg-up">
		            <i className="material-icons">menu</i>
		          </a>
		          <a className="brand-logo" href="#">
		            <img className="expanding-hidden" src={basePath('/assets/images/logo.png')} alt="" />
		          </a>
		        </div>
		        <div className="nav-profile dropdown">
		          <a href="#" onClick={ e => e.preventDefault() } className="dropdown-toggle" data-toggle="dropdown">
		            <div className="user-image">
		              <img src={basePath('/assets/images/avatar.jpg')} className="avatar img-circle" alt="user" title="user" />
		            </div>
		            <div className="user-info expanding-hidden">
		              { this.state.userInfo.name }
		              <small className="bold">Admin</small>
		            </div>
		          </a>
		          <div className="dropdown-menu">
		            <a className="dropdown-item" href="#" onClick={ e => e.preventDefault() } >Settings</a>
		            <a className="dropdown-item" href="#" onClick={ e => e.preventDefault() } >Upgrade</a>
		            <a className="dropdown-item" href="#" onClick={ e => e.preventDefault() } >
		              <span>Notifications</span>
		              <span className="tag bg-primary">34</span>
		            </a>
		            <div className="dropdown-divider"></div>
		            <a className="dropdown-item" href="#" onClick={ e => e.preventDefault() } >Help</a>
		            <a className="dropdown-item" href="/login">Logout</a>
		          </div>
		        </div>
		        <nav>
		          <p className="nav-title">เมนู</p>
		          <ul className="nav">
		            <li>
		              <Link to="/intro">
		                <i className="material-icons text-primary">home</i>
		                <span>หน้าหลัก</span>
		              </Link>
		            </li>
		            <li>
		              <Link to="/login" onClick={() => { this.logout() }}>
		                <i className="material-icons text-primary">lock</i>
		                <span>ออกจากระบบ</span>
		              </Link>
		            </li>
		          </ul>
		          <p className="nav-title">จัดการแก๊ส</p>
		          <ul className="nav">
		            <li>
		              <Link to="/gas/list" >
		                <i className="material-icons text-primary">list</i>
		                <span>รายการแก๊สทั้งหมด</span>
		              </Link>
		            </li>
		            <li>
		              <Link to="/gas" >
		                <i className="material-icons text-primary">cached</i>
		                <span>เปลี่ยนแก๊ส</span>
		              </Link>
		            </li>
		            <li>
		              <Link to="/gas/add" >
		                <i className="material-icons text-primary">add</i>
		                <span>เพิ่มรหัสถังใหม่</span>
		              </Link>
		            </li>
								{ /*
		            <li>
								<Link to="/stock/uploadCsv">
		                <i className="material-icons text-primary">file_upload</i>
		                <span>อัพโหลด .csv</span>
										</Link>
										</li>
									*/ }
		          </ul>

		          <p className="nav-title">สั่งแก๊ส Linde</p>
		          <ul className="nav">
		            <li>
		              <Link to="/linde/list">
		                <i className="material-icons text-primary">assignment</i>
		                <span>ใบงาน Linde ทั้งหมด</span>
		              </Link>
								</li>
		            <li>
		              <Link to="#" >
		                <i className="material-icons text-primary">add</i>
		                <span>ทำใบสั่งซื้อแก๊สจาก Linde</span>
		              </Link>
		            </li>
							</ul>

							<p className="nav-title">ใบงาน</p>
							<ul className="nav">
		            <li>
		              <Link to="/doc/gas/list">
		                <i className="material-icons text-primary">assignment</i>
		                <span>ใบงานลูกค้าแก๊สทั้งหมด</span>
		              </Link>
								</li>
		            <li>
		              <Link to="/doc/gas/add">
		                <i className="material-icons text-primary">add</i>
		                <span>ทำใบงานแก๊ส</span>
		              </Link>
								</li>
							</ul>
							
							<p className="nav-title">ลูกค้า</p>
							<ul className="nav">
		            <li>
		              <Link to="/customer/list">
		                <i className="material-icons text-primary">recent_actors</i>
		                <span>รายชื่อลูกค้าทั้งหมด</span>
		              </Link>
								</li>
		            <li>
		              <Link to="/customer/add">
		                <i className="material-icons text-primary">add</i>
		                <span>เพิ่มรายชื่อลูกค้า</span>
		              </Link>
								</li>
							</ul>
		        </nav>
		      </div>
		    </Fragment>
		)
	}
}

function mapStateToProps(state) {
	return {
		userInfo: state.userLogin
	}
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getMaterialList, 
		changeValidStatus,
		toggleMenu,
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)