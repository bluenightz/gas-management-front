import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import withAuth from '../../utils/withAuth';
import axios from 'axios';
import { API_ROOT } from '../../config';
import { getOptionHeaderToken } from '../../utils/token';

import BlankSidebarLayout from '../layout/blank_sidebar';
import CustomerAddForm from '../form/customer_add_form';

class CustomerAddSection extends Component {
  
  constructor(args) {
    super(args);
    
  }

  handleSubmit(value) {
    const options = getOptionHeaderToken();
  
    axios.post(`${API_ROOT}/customer`, {data: value}, options)
      .then(() => {
        alert('เพิ่มเรียบร้อยแล้ว');
      })
      .catch((err) => {
        alert('มีข้อผิดพลาดทาง Server');
      })
  }

  contentrender() {
    return (
      <Fragment>
			  <h5 className="mb-3">เพิ่มรายชื่อลูกค้า</h5>
        <div className="col-12 col-sm-12 col-md-5">
          <CustomerAddForm onSubmit={this.handleSubmit}/>
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
		// gasList: state.gasList,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		// getGasList, setReplaceGas
	}, dispatch)
}

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(CustomerAddSection))

// export default withAuth(CustomerAddSection);