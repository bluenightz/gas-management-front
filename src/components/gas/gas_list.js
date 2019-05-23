import React, { Component, Fragment } from 'react';
import BasicList from '../basic/list';
import axios from 'axios';
import { API_ROOT } from '../../config';
import { GAS_STATUS_LANG } from '../../const';
import Modal from 'react-responsive-modal';
import { getOptionHeaderToken } from '../../utils/token';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withAuth from '../../utils/withAuth';

import GasListModalForm from '../form/gaslist_modal_form';

class GasList extends Component {

  constructor(args) {
    super(args);
    this.status = GAS_STATUS_LANG;
    this.state = {
      open: false,
      orderDetail: null,
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getDetail = this.getDetail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    
  }
  
  fetchData() {
    this.props.basicListFetch('/gas');
  }

  handleClick(_id) {
    this.openModal(_id);
  }

  handleSubmit(value) {
    const postData = { data: value, orderId: this.state.orderDetail.data.data._id };
    const options = getOptionHeaderToken();
    axios.post(`${API_ROOT}/gas/return`, postData, options)
      .then(() => {
        alert('อัพเดทข้อมูลแล้ว');
        this.closeModal();
        this.fetchData();
      })
  }

  getDetail() {
    // if(!this.state.currentClickId) return <div align="center">กำลังดึงข้อมูล...</div>;

    if(this.state.orderDetail) {
      const order = this.state.orderDetail.data.data;
      return (
        <GasListModalForm onSubmit={this.handleSubmit} order={order} />
      );
    } else {
      return <div align="center">กำลังดึงข้อมูล...</div>
    }
    
  }

  openModal(_id) {
    const option = getOptionHeaderToken();
    axios.get(`${API_ROOT}/customerOrder/${_id}`, option)
      .then((customerOrder) => {
        this.setState({ orderDetail: customerOrder });
        this.setState({ open: true });
      });
  }

  closeModal() {
    this.setState({ open: false, orderDetail: null });
  }

  getModelColumn() {
    return [
      {
        accessor: 'sku',
        Header: 'รหัสถังแก๊ส',
        Cell: ({ original: { sku }}) => <div align="center">{ sku }</div>,
      },
      {
        accessor: 'holder.name',
        Header: 'อยู่กับ',
        Cell: ({ original }) => {
          if (!original.holder) return <div></div>

          return <div align="center">{`${original.holder.name || ''} ${original.holder.customerCode || ''}`}</div>
        },
      },
      {
        accessor: 'psi',
        Header: 'ความจุถังแก๊ส',
        Cell: ({ original: { psi }}) => <div align="center">{psi}</div>,
      }
    ]
  }
  

  render() {
    const { open } = this.state;
    
    return <Fragment>
      <BasicList {...this.props} model={this.getModelColumn()} pagename="รายการแก๊สทั้งหมด" apiPath="/gas" />
      <Modal open={open} onClose={this.closeModal}>
        {this.getDetail()}
      </Modal>
    </Fragment>
  }
}

// export default GasList;


function mapStateToProps(state) {
	return {
    // gasList: state.gasList,
    // basicListData: state.basicListData,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
    // getGasList, setReplaceGas
    // basicListFetch,
	}, dispatch)
}

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(GasList))
