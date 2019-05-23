import React, { Component } from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'
import { isTokenValid } from '../utils/token'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { isTokenValid2, changeValidStatus } from '../actions'

class PrivateRoute extends Component{

    constructor(props){
        super(props)
    }

    componentDidMount() {
        this.props.isTokenValid2()
            .then(res => {
                this.props.changeValidStatus(true);
                setTimeout(() => {
                    console.log('in isTokenValid2 response', this.props.validStatus);
                }, 5000);
            })
    }



    render() {
        const Tag = this.props.component
        const { path } = this.props
        
        if (this.props.validStatus)
            return <Route path={path} render={(props) => <Tag {...props} />} />

        return <Route path={path} render={(props) => <Redirect to={{ pathname: '/login', state: { from: props.location }}} />} />
    }
    
}

function mapStateToProps(state) {
	return {
		isValidToken: state.isValidToken,
		validStatus: state.validStatus,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
        isTokenValid2,
        changeValidStatus,
	}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateRoute))