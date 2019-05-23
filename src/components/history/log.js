import React, { Component, Fragment } from 'react'
import BlankSidebarLayout from '../layout/blank_sidebar'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as Text from '../../const'
import { getLog } from '../../actions'




class Log extends Component {

	componentDidMount() {
		// this.inputTerm.current.focus()
		this.initMaterial()
	}

	constructor( props ) {
		super( props )
        this.state = {
            log: []
        }
	}

	setTerm(material) {
		this.setState({
			term: material
		})
	}

	initMaterial() {
        this.props.getLog()
            .then( res => {
                this.setState({ log: res.data })
            })
	}

	renderItem() {
		const items = this.props.log
		if( !items ) return "<tr><td colspan='4'>ไม่มีข้อมูล</td></tr>"

		return (
			items.map( (element, index) => {
				return (
                    <tr key={index}>
                        <td>{element.created_time}</td>
                        <td>{element.type}</td>
                        <td>{element.detail}</td>
                        <td><a href="#">#work123</a></td>
                    </tr>
                )
			})
		)
	}

	contentRender() {
		return (
			<div className="row">
				<div className="col-12">
			        <div className="tab-content mb-3">
			          <div className="tab-pane active" id="import_type_form" role="tabpanel" aria-expanded="true">
			            <p className="mt-3">ประวัติการทำรายการ</p>
			            
					    <hr/>
                        
                        <table className="table table-bordered table-sm">
                            <thead>
                                <tr>
                                    <th>วันที่ทำรายการ</th>
                                    <th>ประเภท</th>
                                    <th>รายละเอียด</th>
                                    <th>ลิงค์</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.renderItem() }
                            </tbody>
                        </table>

			          </div>
			        </div>
				</div>
			</div>
		)
	}


	render() {
		return (
			<BlankSidebarLayout content={this.contentRender()} />
		)
	}
}

function mapStateToProps(state) {
	return {
        log: state.log
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getLog
	}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Log)