import React, { Component, Fragment } from 'react'
import BlankSidebarLayout from '../layout/blank_sidebar'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { withRouter } from "react-router-dom"
import _ from 'lodash/core'

import * as Text from '../../const'
import { createItem, createStockTransaction, clearItemList, resultFromServer } from '../../actions'
import Itemcard from './item_card'
import ResultImportExport from './result_import_export'

class StockImportExport extends Component {

	componentDidMount() {
		this.inputTerm.current.focus()
	}

	constructor( props ) {
		super( props )

		this.inputTerm = React.createRef()

		this.state = { 
			term: '',
			import_result: [], 
			export_result: [] 
		}

		this.inputChange = this.inputChange.bind(this)
		this.createItem = this.createItem.bind(this)
	}

	renderItem() {
		const items = this.props.items
		if( !items ) return "<div>...</div>"

		return (
			items.map( (element, index) => {
				return <Itemcard sku={element.sku} quantity={element.quantity} title={element.title} categories={element.categories} key={element.sku} />
			})
		)
	}

	isItemExist(sku) {
		let result = false
		_.forEach( this.props.items, ele => {
			if( ele.sku == sku ){
				result = true
			}
		});
		return result
	}

	createItem() {
		const sku = this.state.term
		if( this.isItemExist(sku) ) {
			alert( Text.ITEM_ALREADY_EXIST )
		}else {
			this.props.createItem( {
				'sku': this.state.term,
				'quantity': 0,
				'title': 'Large Shape Princesses Frame',
				'categories': 'Anagram > พิมพ์ลาย'
			} )
		}
		this.setState({ term: '' })
	}

	inputChange( event ) {
		this.setState({
			term: event.target.value
		})
	}

	onHandleSubmit( event ){
		if( this.props.items.length == 0 ) {
			alert(Text.NO_ITEM_IN_CART);
			return false
		}

		this.setState({ term: '' })

		let transactionObj = {
			"import": [], "export": []
		}

		transactionObj[ this.props.match.params.pagename ] = this.props.items

		this.props.createStockTransaction( transactionObj , ( result ) => {
			console.log( result.data )
			this.props.resultFromServer( result.data )
			this.props.clearItemList()
			return result.data
		})
	}

	contentRender() {
		return (
			<div className="row">
				<div className="col-12">
					<ul className="nav nav-tabs" role="tablist">
			          <li className="nav-item">
			            <a className="nav-link active" data-toggle="tab" href="#import_type_form" role="tab" aria-expanded="true"><i className="material-icons">file_upload</i> อัพโหลด .csv</a>
			          </li>
			        </ul>
			        <div className="tab-content mb-3">
			          <div className="tab-pane active" id="import_type_form" role="tabpanel" aria-expanded="true">
			            <p className="mt-3">ค้นหาสินค้าที่ต้องการจากรหัสสินค้า จากนั้นกดเลือกที่สินค้าแล้วปรับตามจำนวนที่ต้องการ สามารถเลือกสินค้าได้มากกว่าหนึ่งประเภท</p>
			            <div className="form-inline">
				            <div className="form-group">
					            <div className="input-group">
					            	<div className="input-group-addon"><i className="material-icons">search</i></div>
					            	<input type="text" className="form-control" value={ this.state.term } placeholder="ใส่รหัสสินค้าเพื่อค้นหา..." onChange={ this.inputChange } ref={this.inputTerm} />
					            </div>
					        </div>&nbsp;
			        		<button className="btn btn-primary btn-icon" onClick={ this.createItem }><i className="material-icons">add</i>เพิ่ม</button>
					    </div>
					    <hr/>
			            <form className="form-inline">
							
							{ this.renderItem() }				            

				            <div className="row">
				            	<div className="col text-right">
					            	<button type="button" className="btn-primary btn" onClick={ () => this.onHandleSubmit() }>ขั้นตอนต่อไป</button>
				            	</div>
				            </div>
			            </form>

			            <ResultImportExport />

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
		items: state.items
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		createItem, createStockTransaction, clearItemList, resultFromServer
	}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(StockImportExport)