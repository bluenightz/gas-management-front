import React, { Component, Fragment } from 'react'
import BlankSidebarLayout from '../layout/blank_sidebar'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { withRouter, Prompt } from "react-router-dom"
import _ from 'lodash/core'

import * as Text from '../../const'
import { createItem, createStockTransaction, clearItemList, resultFromServer, getMaterialList } from '../../actions'
import Itemcard from './item_card'
import ResultImportExport from './result_import_export'
import SearchMaterial from '../../components/search_material'
import SearchCustomer from '../../components/search_customer'
import withAuth from '../../utils/withAuth';


const pagename = {
	"import": "นำเข้า",
	"export": "นำออก"
}

class StockImportExport extends Component {

	componentDidMount() {
		// this.inputTerm.current.focus()
		this.initMaterial()
	}

	constructor( props ) {
		super( props )


		this.inputTerm = React.createRef()

		this.state = { 
			term: {},
			import_result: [], 
			export_result: [],
			materials: []
		}

		this.inputChange = this.inputChange.bind(this)
		this.createItem = this.createItem.bind(this)
		this.setTerm = this.setTerm.bind(this)

		props.history.listen( (location, action) => {
			this.props.clearItemList()
		})

	}

	setTerm(material) {
		this.setState({
			term: material
		})
	}

	initMaterial() {
		// cat_name
		// material_name
		// quantity
		// sku
		// __v
		// _id
		this.props.getMaterialList('all')
			.then( res => {
				this.setState({ materials: res.payload.data.materials })
			})
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
		const term = this.state.term
		if( this.isItemExist(term.sku) ) {
			alert( Text.ITEM_ALREADY_EXIST )
		}else {
			this.props.createItem( {
				'sku': term.sku,
				'quantity': 0,
				'title': term.material_name,
				'categories': term.cat_name
			} )
		}
		this.setState({ term: {} })
		console.log(this.child.wrappedInstance)
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
			alert(Text.SEND_DATA_SUCCESS)
			this.props.resultFromServer( result.data )
			this.props.clearItemList()
			return result.data
		})

	}

	pagenameWithArrow() {
		switch( this.props.match.params.pagename ){
			case 'import':
				return <Fragment><i className={ `material-icons text-success` }>arrow_forward</i> <span className="text-success">{pagename.import}</span></Fragment>
			case 'export':
				return <Fragment><i className={ `material-icons text-danger` }>arrow_backward</i> <span className="text-danger">{pagename.export}</span></Fragment>
		}
	}

	contentRender() {
		return (
			<div className="row">
				<Prompt when={(this.props.items.length != 0)}
						message={location => Text.ITEM_IN_PROGESS_ARE_U_SURE_CHANGEPAGE} />
				<div className="col-12">
					{ /* }
					<ul className="nav nav-tabs" role="tablist">
			          <li className="nav-item">
			            <a className="nav-link active" data-toggle="tab" href="#import_type_form" role="tab" aria-expanded="true">{ this.pagenameWithArrow() }</a>
			          </li>
					</ul>
					{ */ }
			        <div className="tab-content mb-3">
			          <div className="tab-pane active" id="import_type_form" role="tabpanel" aria-expanded="true">
						<div className="row">
							<div className="col-12">
					  			<h4>{ this.pagenameWithArrow() }</h4>
								<hr />
							</div>
						</div>
						
						<div className="row">
							<div className="col-12 col-md-5">
					  			<h5>ข้อมูลลูกค้า</h5>
							</div>
							<div className="col-12 col-md-7 text-right">
								<SearchCustomer setTerm={this.setTerm} ref={instance => { this.child = instance }} createItem={ this.createItem } />
							</div>
						</div>
						<hr />
						<div className="row">
							<div className="col-12 col-md-5">
					  			<h5>รายการสินค้า</h5>
							</div>
							<div className="col-12 col-md-7 text-right">
								<SearchMaterial setTerm={this.setTerm} ref={instance => { this.child = instance }} createItem={ this.createItem } />
							</div>
						</div>
			            

			            <form className="form-inline">
							
							{ this.renderItem() }	

				            <div className="row">
				            	<div className="col text-right">
									<hr/>
					            	<button type="button" className="btn-success btn btn-icon" onClick={ () => this.onHandleSubmit() }><i className="material-icons">save</i>บันทึก</button>
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
		items: state.items,
		productList: state.productList,
		resultImportExport: state.stockResult
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		createItem, createStockTransaction, clearItemList, resultFromServer, getMaterialList
	}, dispatch)
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withAuth(StockImportExport)))