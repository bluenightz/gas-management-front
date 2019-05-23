import React, { Component, Fragment } from 'react'
import BlankSidebarLayout from '../layout/blank_sidebar'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as Text from '../../const'
import { getOrders } from '../../actions'
const moment = require('moment')




class Order extends Component {

	componentDidMount() {
		// this.inputTerm.current.focus()
		this.initMaterial()
	}

	constructor( props ) {
		super( props )
        this.state = {
            orders: []
        }
	}

	initMaterial() {
        this.props.getOrders()
            .then( res => {
                const data = res.payload.data.data
                this.setState({ orders: data })
            })
    }
    
    genStatus(status) {
        switch(status){
            case "order_status_expire":
                return <span className="badge badge-default">ยกเลิก: เลยกำหนดชำระเงิน</span>
                break;
            case "order_status_waiting_for_payment":
                return <span className="badge badge-primary">รอหลักฐานการชำระเงิน</span>
                break;
            default:
                return <span></span>

        }
    }

	renderItem() {
		const items = this.props.orders
		if( !items ) return "<tr><td colspan='3'>ไม่มีข้อมูล</td></tr>"

		return (
			items.map( (element, index) => {
				return (
                    <tr key={index}>
                        <td><a href="#" className="text-primary">{element.ordernumber}</a></td>
                        <td>

                            { this.getList(element.transactionObj, "import") }
                            { this.getList(element.transactionObj, "export") }
                            
                        </td>
                        <td>{moment(element.orderdate).format('DD MMMM YYYY')}</td>
                        <td>{ this.genStatus(element.status) }</td>
                    </tr>
                )
			})
		)
    }
    
    getList( transactionObj, option ) {
        const data = JSON.parse(transactionObj)

        if(data[option] == 0) return <Fragment></Fragment>
        
        return (
            <Fragment>
                <strong className={ (option == "import") ? "d-block text-success" : "d-block text-danger" }>
                    { (option == "import") ? "นำเข้า" : "นำออก" }
                </strong>
                <ul>
                    {
                        data[option].map( (element, index) => {
                            return (
                                <li key={element.sku} className=""><strong>{element.sku}</strong> - {element.title} จำนวน: {element.quantity} </li>
                            )
                        })
                    }
                </ul>
            </Fragment>
        )
    }

	contentRender() {
		return (
			<div className="row">
				<div className="col-12">
			        <div className="tab-content mb-3">
			          <div className="tab-pane active" id="import_type_form" role="tabpanel" aria-expanded="true">
			            <h4 className="mt-3">ออเดอร์ทั้งหมด</h4>
			            
					    <hr/>
                        
                        <table className="table table-bordered table-sm">
                            <thead>
                                <tr>
                                    <th>#Order</th>
                                    <th>รายละเอียด</th>
                                    <th>วันที่ทำรายการ</th>
                                    <th>สถานะ</th>
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
        orders: state.orders
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getOrders
	}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Order)