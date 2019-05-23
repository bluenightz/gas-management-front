import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createItem, changeQuantity, deleteItem } from '../../actions'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'

class Itemcard extends Component {

	componentDidMount() {
		this.inputItem.current.focus()
		this.inputItem.current.select(0, 10)
	}

	constructor( props ) {
		super( props )
		this.inputItem = React.createRef()
	}

	onInputChange(event, sku) {
		this.props.changeQuantity( sku, Number(event.target.value) )
	}

	onHandleDelete(sku) {
		this.props.deleteItem(sku)
	}

	render() {
		return (

	        <div className="row">
            	<div className="col mt-3">
            		<div className={`card card-block item-${this.props.match.params.pagename}`}>
            			<div className="row align-items-start">
							{ /* }
            				<div className="col-6 col-md-2 col-lg-2 col-xl-1 order-1 order-md-1 mb-3 mb-md-0">
            					<img src="//placehold.it/130x150" className="img-fluid" alt="" />
            				</div>
	            			<div className="col-12 col-md-8 col-xl-9 order-3 order-md-2 item-import__detail">
	            				<strong>รหัส</strong> : {this.props.sku} <strong>ชื่อสินค้า</strong> : {this.props.title} <strong>หมวด</strong> : {this.props.categories}
	            				<div className="row">
	            					<div className="col-12 col-md-6 col-lg-7 col-xl-4">
						            	<div className="form-group mt-2">
						            		<div className="input-group">
							            		<div className="input-group-addon">จำนวน</div>
							            		<input type="number" placeholder="0" value={ this.props.quantity } onChange={ (event) => { this.onInputChange(event, this.props.sku) } } className="form-control text-center" ref={ this.inputItem } />
							            		<div className="input-group-addon">ชิ้น</div>
						            		</div>
						            	</div>
	            					</div>
	            				</div>
	            			</div>
							{ */ }
	            			<div className="col-10 col-md-10 col-xl-10 order-3 order-md-2 item-import__detail">
	            				<strong>รหัส</strong> : {this.props.sku} <strong>ชื่อสินค้า</strong> : {this.props.title} <strong>หมวด</strong> : {this.props.categories}
	            				<div className="row">
	            					<div className="col-12 col-md-4">
						            	<div className="form-group mt-2">
						            		<div className="input-group">
							            		<div className="input-group-addon">จำนวน</div>
							            		<input type="number" placeholder="0" value={ this.props.quantity } onChange={ (event) => { this.onInputChange(event, this.props.sku) } } className="form-control text-center" ref={ this.inputItem } />
							            		
						            		</div>
						            	</div>
	            					</div>
	            				</div>
	            			</div>
	            			<div className="col-2 col-md-2 col-xl-2 text-right order-2 order-md-3">
								<div className="btn-group">
									<button type="button" onClick={ () => this.onHandleDelete( this.props.sku ) } className="btn btn-danger btn-sm btn-icon"><i className="material-icons">close</i><span className="d-none d-md-inline">ลบ</span></button>
								</div>
	            			</div>
            			</div>
		            </div>
	            </div>
            </div>

		)
	}
}

function mapStateToProps(state) {
	return {
		items: state.items
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		createItem, changeQuantity, deleteItem
	}, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Itemcard))