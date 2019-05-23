import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

class ResultImportExport extends Component {

	createList( array ) {
		return (
			array.map( (element, index) => {
				return (
					<tr key={element.sku}>
						<td>{element.sku}</td>
						<td>{element.title}</td>
						<td>{element.quantity}</td>
						<td>{element.total}</td>
					</tr>
				)
			})
		)
	}

	showImport() {

		if( this.props.resultImportExport.import.length > 0 ) {
			return (
				<Fragment>
					<strong>นำเข้า</strong>
					<table className="table table-sm table-success">
						<thead>
							<tr>
								<th>รหัสสินค้า</th>
								<th>ชื่อสินค้า</th>
								<th>นำเข้า</th>
								<th>ยอดสรุป</th>
							</tr>
						</thead>
						<tbody>
							{ this.createList( this.props.resultImportExport.import ) }
						</tbody>
					</table>
				</Fragment>
			)
		}else {
			return <Fragment></Fragment>
		}

	}


	showExport() {

		if( this.props.resultImportExport.export.length > 0 ) {
			return (
				<Fragment>
					<strong>นำออก</strong>
					<table className="table table-sm table-warning">
						<thead>
							<tr>
								<th>รหัสสินค้า</th>
								<th>ชื่อสินค้า</th>
								<th>นำออก</th>
								<th>ยอดสรุป</th>
							</tr>
						</thead>
						<tbody>
							{ this.createList( this.props.resultImportExport.export ) }
						</tbody>
					</table>
				</Fragment>
			)
		}else {
			return <Fragment></Fragment>
		}

	}


	render() {
		
		if( this.props.resultImportExport.import.length != 0 || this.props.resultImportExport.export.length != 0 ){
			return (
				<Fragment>
					<hr className="mt-5"/>
					<h5 className="mt-3">สรุปยอดล่าสุด</h5>

					{ this.showImport() }
					{ this.showExport() }

				</Fragment>
			)
		}else {
			return <div></div>
		}
	}
}

function mapStateToProps( state ) {
	return {
		resultImportExport: state.stockResult
	}
}

export default connect(mapStateToProps ,null)(ResultImportExport)