import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import withAuth from '../../utils/withAuth';
import axios from 'axios';
import { API_ROOT } from '../../config';
import { getOptionHeaderToken } from '../../utils/token';

import BlankSidebarLayout from '../layout/blank_sidebar';
import GasAddForm from '../form/gas_add_form';

class GasAddSection extends Component {
  
  constructor(args) {
    super(args);
    
  }

  handleSubmit(value) {
    const options = getOptionHeaderToken();
  
    axios.post(`${API_ROOT}/gas`, {data: value}, options)
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
			  <h5 className="mb-3">เพิ่มรหัสถังใหม่</h5>
        <div className="col-12 col-sm-12 col-md-5">
          <GasAddForm onSubmit={this.handleSubmit}/>
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

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(GasAddSection))

// export default withAuth(GasAddSection);