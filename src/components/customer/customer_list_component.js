import React, { Component } from 'react';
import BasicList from '../basic/list';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { basicListFetch } from '../../actions';

class CustomerList extends Component {
  constructor(args) {
    super(args);
  }

  componentDidMount() {
    this.props.basicListFetch('/customer');
  }

  getModelColumn() {
    return [
      {
        accessor: 'customerCode',
        Header: 'รหัสลูกค้า',
      },
      {
        accessor: 'name',
        Header: 'ชื่อลูกค้า',
      },
    ]
  }

  render() {
    return <BasicList {...this.props} model={this.getModelColumn()} pagename="รายชื่อลูกค้าทั้งหมด" apiPath="/customer" />
  }
}

// export default CustomerList;

function mapStateToProps(state) {
	return {
    // gasList: state.gasList,
    // basicListData: state.basicListData,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
    // getGasList, setReplaceGas
    basicListFetch,
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerList)