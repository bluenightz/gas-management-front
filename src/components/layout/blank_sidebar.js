import React, { Component, Fragment } from 'react'

import Sidebar from '../inc/sidebar'
import Topbar from '../inc/topbar'
import Footer from '../inc/footer'

export default class BlankSidebar extends Component {

	render() {
		return (

			<Fragment>

			      <Sidebar />

			      <div className="main-panel">

			        <Topbar />

			       
			        <div className="main-content">
			          <div className="content-view">
			            
						{ this.props.content }

			          </div>

			          <Footer />

			        </div>

			      </div>


			</Fragment>
		)
	}
}