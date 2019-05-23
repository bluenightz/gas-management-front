import React, { Component } from 'react'
import BlankLayout from './layout/blank'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LoginForm from './form/login_form'
import { userLogin, changeValidStatus } from '../actions'
import { API_ROOT, basePath } from '../config';
import Auth from "../utils/authService"

class LoginSection extends Component {

	constructor( props ) {
		super( props )

		this.login = this.login.bind(this);
		this.auth = new Auth(API_ROOT);
		this.state = {
			username: ""
		}

	}

	componentDidMount() {
	}

	login(value) {
		const context = this
		this.auth.login(value.name, value.password)
			.then((res) => {
				if (this.auth.loggedIn()) {
					context.props.history.push("/intro");
				} else {
					context.props.history.push("/login");
				}
			})
	}

	contentRender() {
		return (
			<div className="container">
				<div className="row justify-content-center align-items-center h-100">
					<div className="col-12 col-md-6 col-xl-4">
						<div className="card card-block">
							<div className="mb-4">
								<img src={basePath('/assets/images/logo.png')} alt="" />
							</div>
							<LoginForm onSubmit={ this.login }/>
						</div>
					</div>
				</div>
			</div>
		)
	}

	render() {
		return (
			<BlankLayout content={ this.contentRender() } />
		)
	}
}

function mapStateToProps(state) {
	return {
		userInfo: state.userLogin,
		validStatus: state.validStatus,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		userLogin,
		changeValidStatus,
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginSection)