import React, { Component, Fragment } from 'react';
import ReactTable from 'react-table'
import matchSorter from 'match-sorter'
import { arrayPush } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getFullGas, createCustomerOrder, getNotFullGas } from '../../actions/index'
import withAuth from '../../utils/withAuth';
import moment from 'moment';
import BlankSidebarLayout from '../layout/blank_sidebar';
import DocGasAddForm from '../form/doc_gas_add_form';
import { DATE_FORMAT_DDMMYYYY } from '../../config';

class DocGasAddSection extends Component {
  
  constructor(args) {
    super(args);

    this.state = {
      data: [],
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchGasList = this.fetchGasList.bind(this);
    this.createCustomerOrder = this.createCustomerOrder.bind(this);
  }

  fetchGasList(state = 'full') {
    if (state == 'notFull') {
      this.props.getNotFullGas()
        .then(() => this.setState({ data: this.props.gasList.data }));
    } else {
      this.props.getFullGas()
        .then(() => this.setState({ data: this.props.gasList.data }));
    }
  }

  componentDidMount() {
    this.fetchGasList();
  }

  createCustomerOrder(postData) {    
    console.log('createCustomerOrder', postData);
    this.props.createCustomerOrder(postData)
      .then(() => {
        alert('เพิ่มเรียบร้อยแล้ว');
        this.fetchGasList();
      })
      .catch((err) => {
        alert('มีข้อผิดพลาดทาง Server');
      })
  }

  handleSubmit(value) {
    const postData = Object.assign({}, value);
    postData.orderDate = moment(value.orderDate, DATE_FORMAT_DDMMYYYY).toDate().getTime();
    postData.orderReturn = moment(value.orderReturn, DATE_FORMAT_DDMMYYYY).add(19, 'hours').toDate().getTime();
    postData.onModel = (this.props.dropDownState === 'dropdown_gasStatus_buy')? 'gasVendor' : 'customer';
    this.createCustomerOrder(postData);
  }

  contentrender() {

    const columns = [
      {
        accessor: '_id',
        show: false,
      },
			{
				Header: 'รหัสถังแก๊ส',
				accessor: 'sku',
				filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["sku"] }),
        filterAll: true
			},
			{
        Header: 'ความจุแก๊ส',
        accessor: 'psi',
        // filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ["psi"] }),
        filterMethod: (filter, rows) => {
					const operator = filter.value.toString()[0]
					const filterValue = filter.value
					const length = filterValue.length
					if( !Number(operator) && length > 1 ){
						// first character is operator
            const solution = rows.psi + operator + filterValue.toString().replace(/^./, '')
						return eval(solution)
          }
					return Number(rows.psi) === Number(filterValue)
				},
        //filterAll: true,
        Cell: ({original: {psi}}) => <div align="center">{Number(psi).toLocaleString()}</div>
      },
			{
        Header: 'อยู่กับ',
        accessor: 'holder.name',
				filterMethod: (filter, rows) => {
          return matchSorter(rows, filter.value, { keys: [item => item['holder.name']] })
        },
        filterAll: true,
        Cell: ({original: {holder: {name}}}) => <div align="center">{name}</div>
      },
			{
        Header: 'เพิ่ม',
        filterable: false,
        Cell: ({row:{_id, sku, psi}}) => (
          <div align="center">
            <button className="btn btn-success btn-sm" onClick={() => { 
              this.props.arrayPush('docGasAddForm', 'gasList', {_id, sku, psi});
              }
            }>เลือกใส่รายการ &gt;</button>
          </div>
        )
      },
    ];


    return (
      <Fragment>
			  <h5 className="mb-3">ทำใบงานแก๊ส</h5>
        <div className="row">
          <div className="col-12 col-sm-6 order-sm-2">
            <DocGasAddForm onSubmit={this.handleSubmit} fetchGasList={this.fetchGasList}/>
          </div>
          <div className="col-12 col-sm-6 order-sm-1">
            <ReactTable 
              data={this.state.data} columns={columns} className="-striped -highlight" defaultPageSize={10} 
                  filterable />
          </div>
        </div>
      </Fragment>
    )
  }

  render() {
    return <BlankSidebarLayout content={this.contentrender()} />
  }
}


function mapStateToProps(state) {
	return {
    gasList: state.gasList,
    dropDownState: state.appState
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
    createCustomerOrder,
    getFullGas,
    arrayPush,
    getNotFullGas,
	}, dispatch)
}

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(DocGasAddSection))

