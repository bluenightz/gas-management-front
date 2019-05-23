import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getGasList, setReplaceGas } from '../../actions/index'
import withAuth from '../../utils/withAuth';
import _ from 'lodash/core';
import Modal from 'react-responsive-modal';
import axios from 'axios';
import { API_ROOT } from '../../config';
import { getOptionHeaderToken } from '../../utils/token';

import BlankSidebarLayout from '../layout/blank_sidebar';
import GasItem from './gas_item'
import ReplaceGasForm from '../form/replace_gas_form';

class GasSection extends Component {
  
  constructor(args) {
    super(args);
    this.state = {
      gasList: [],
      open: false,
    }

    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getGasList()
      .then((gasList) => {
        this.setState({
          gasList: gasList.payload.data.data
        })
      })
  }

  handleSubmit(value) {

    this.setState({
      gasList: []
    });

    const options = getOptionHeaderToken();
  
    axios.post(`${API_ROOT}/gas/replace`, {data: JSON.stringify(value)}, options)
      .then((res) => this.props.getGasList())
      .then((gas) => {
        this.setState({
          gasList: gas.payload.data.data
        });
        this.onCloseModal();
      })
  }

  onOpenModal(data) {
    this.props.setReplaceGas(data);
    this.setState({
      open: true,
    })
  }

  onCloseModal() {
    this.setState({
      open: false,
    })
  }

  gasList() {
    return _.map(this.state.gasList, (ele, index) => {
      return (
        <div className="row no-gutters" key={`key-${index}`}>
          <GasItem data={ele} handleClick={this.onOpenModal} />
        </div>
      );
    })
  }

  contentrender() {
    const { open } = this.state;
    return (
      <Fragment>
			  <h5 className="mb-3">เปลี่ยนแก๊ส</h5>
				<div className="">
          { this.gasList() }
        </div>
        <Modal open={open} onClose={this.onCloseModal} center>
          <h5 className="mr-5">รายละเอียดการเปลี่ยนถัง</h5>
          <ReplaceGasForm onSubmit={this.handleSubmit}/>
        </Modal>
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
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getGasList, setReplaceGas
	}, dispatch)
}

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(GasSection))