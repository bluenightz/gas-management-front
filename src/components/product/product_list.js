import React, { Component, Fragment } from 'react'
import BlankSidebarLayout from '../layout/blank_sidebar'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ReactTable from 'react-table'
import matchSorter from 'match-sorter'
import { getMaterialList } from '../../actions'
import _ from 'lodash/core'

class ProductList extends Component {

	constructor( props ) {
		super( props )
		this.state = {
			result_count: 0
		}
		this.props.getMaterialList( this.props.match.params.cat_name )
			.then(materials => {
				this.setState({ 
					result_count: this.props.productList.materials.length
				})
			})
	}

	componentDidMount() {

	}

	renderList() {
		if( !this.props.productList ) {
			return ( 
				<tr>
					<td colSpan="3">ไม่มีข้อมูล</td>
				</tr> 
			)
		}else{
			return _.map(this.props.productList.materials, (element, index) => {
				return (
					<tr key={index}>
						<td>{element.sku}</td>
						<td>{element.material_name}</td>
						<td>{element.quantity.toLocaleString()}</td>
					</tr>
				)
			})
		}
	}
	
	contentRender() {
		const data = this.props.productList.materials

		const columns = [
			{
				Header: 'รหัสสินค้า',
				accessor: 'sku',
				filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["sku"] }),
                filterAll: true
			},
			{
				Header: 'ชื่อสินค้า',
				accessor: 'material_name',
				filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["material_name"] }),
                filterAll: true
			},
			{
				Header: 'จำนวน',
				accessor: 'quantity',
				filterMethod: (filter, rows) => {
					const operator = filter.value.toString()[0]
					const filterValue = filter.value
					const length = filterValue.length
					if( !Number(operator) && length > 1 ){
						// first character is operator
						const solution = rows.quantity + operator + filterValue.toString().replace(/^./, '')
						return eval(solution)
					}
					return Number(rows.quantity) === Number(filterValue)
				},
				Cell: props => <div align="center">{ (props.value)? props.value.toLocaleString(): 0 }</div>
			}
		]

		// const columns = [{
		//     Header: 'Name',
		//     accessor: 'name' // String-based value accessors!
		//   }, {
		//     Header: 'Age',
		//     accessor: 'age',
		//     Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
		//   }, {
		//     id: 'friendName', // Required because our accessor is not a string
		//     Header: 'Friend Name',
		//     accessor: d => d.friend.name // Custom value accessors!
		//   }, {
		//     Header: props => <span>Friend Age</span>, // Custom header components!
		//     accessor: 'friend.age'
		//   }]


		return (
			<Fragment>
				<h5 className="mb-3">รายการสินค้าในหมวด <span className="text-primary">{ (this.props.productList.count)? this.props.productList.count.toLocaleString(): 0 } รายการ</span></h5>
				<div className="bg-white">
					<ReactTable 
						data={data} columns={columns} className="-striped -highlight" defaultPageSize={10} 
	        			filterable
	        			defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value} />
        		</div>
			</Fragment>
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
		productList: state.productList
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getMaterialList
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)