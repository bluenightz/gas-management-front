import React, { Component, Fragment } from 'react'

export default class Blank extends Component {
	render() {
		return (
			<Fragment>
				{ this.props.content }
			</Fragment>
		)
	}
}