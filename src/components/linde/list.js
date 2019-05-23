import React, { Component, Fragment } from 'react';
import BasicList from '../basic/list';
import moment from 'moment';
import axios from 'axios';
import { DATE_FORMAT_DDMMYYYY, API_ROOT } from '../../config';
import { GAS_STATUS_LANG } from '../../const';
import Modal from 'react-responsive-modal';
import { getOptionHeaderToken } from '../../utils/token';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { basicListFetch } from '../../actions';
import withAuth from '../../utils/withAuth';
import matchSorter from 'match-sorter'

import GasListModalForm from '../form/gaslist_modal_form';

class LindeList extends Component {

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
  
  fetchData() {
    this.props.basicListFetch('/customerOrder');
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
        accessor: 'orderNumber',
        Header: 'หมายเลขใบรายการ',
        Cell: ({ original: { _id, orderNumber }}) => <div align="center"><a href="javascript:void(0)" onClick={() => { this.handleClick(_id) }} className="text-primary"><u>{orderNumber}</u></a></div>,
      },
      {
        accessor: 'status.name',
        Header: 'ประเภทการซื้อ',
        Cell: ({ original: { status: { alt } }}) => <div align="center">{alt}</div>,
        filterMethod: (filter, rows) => {
          return matchSorter(rows, filter.value, { keys: [item => {
            return item._original.status.alt
          }] });
        },
      },
      {
        accessor: 'customerId.customerCode',
        Header: 'รหัสลูกค้า',
        Cell: ({ original: { customerId: { customerCode }}}) => <div align="center">{customerCode}</div>,
      },
      // {
      //   accessor: 'createdDate',
      //   Header: 'วันที่สร้าง',
      // },
      {
        accessor: 'orderDate',
        Header: 'วันที่สั่งซื้อ',
        Cell: ({ original: { orderDate }}) => <div align="center">{moment(orderDate).format(DATE_FORMAT_DDMMYYYY)}</div>,
      },
      {
        accessor: 'orderReturn',
        Header: 'วันที่คืน',
        Cell: ({ original: { orderReturn }}) => <div align="center">{moment(orderReturn).format(DATE_FORMAT_DDMMYYYY)}</div>,
      },
      {
        Header: 'อีกกี่วันคืน',
        Cell: ({ original: { orderDate, orderReturn }}) => {
          const diff = moment(orderReturn).diff(moment(Date.now()), 'days');
          let html;
          if (diff <= 0) {
            html = <div align="center" className="text-danger">ครบกำหนดคืนแล้ว</div>;
          } else {
            html = <div align="center">อีก {diff} วัน</div>;
          }
          return html;
        },
      },
      {
        Header: 'คืนแล้ว(ถัง)',
        Cell: ({ original: { gasListStr }}) => {
          const returned = gasListStr.reduce((prev, curr, index) => (curr.isLocal === true) ? prev + 1: prev, 0)
          const max = gasListStr.length;
          const classList = (returned < max) ? 'text-danger' : 'text-success';

          return <div align="center" className={`${classList}`}>{`${returned}/${max}`}</div>;
        }
      }
    ]
  }


  render() {
    const { open } = this.state;
    
    return <Fragment>
      <BasicList {...this.props} model={this.getModelColumn()} pagename="ใบงาน Linde" apiPath="/customerOrder" />
      <Modal open={open} onClose={this.closeModal}>
        {this.getDetail()}
      </Modal>
    </Fragment>
  }
}

// export default LindeList;


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

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(LindeList))
