import Autosuggest from 'react-autosuggest';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { change } from 'redux-form';
import { bindActionCreators } from 'redux'
import { getCustomers, getVendor } from '../../actions';
import Modal from 'react-responsive-modal';
// Imagine you have a list of dataList that you'd like to autosuggest.

// Teach Autosuggest how to calculate suggestions for any given input value.


// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.

let isLoading = false;
let prevDropdownState = false;
// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {(suggestion.customerCode)? `${suggestion.customerCode} ${suggestion.name}`: `${suggestion.name}`}
  </div>
);

const shouldRenderSuggestions = function () {
  return true;
}

class CustomerSuggest extends Component {
  constructor(args) {
    super(args);

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: [],
      dataList: [],
      open: false,
    };


    this.getSuggestions = this.getSuggestions.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleChoose = this.handleChoose.bind(this);
    this.escapeRegexCharacters = this.escapeRegexCharacters.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
    this.updateDataList = this.updateDataList.bind(this);
  }

  getSuggestionValue(suggestion) {
    this.props.change('docGasAddForm', 'customerHiddenId', suggestion._id);
    return suggestion.customerCode;
  }

  componentDidUpdate() {
    if (!isLoading && 
        ( 
          this.props.dropdownState != prevDropdownState
        )
    ) this.updateDataList();
  }

  componentDidMount() {
    this.updateDataList();
  }

  updateDataList() {
    isLoading = true;
    if (this.props.dropdownState !== false && this.props.dropdownState === 'dropdown_gasStatus_buy') {
      this.props.getVendor()
        .then((result) => {
          isLoading = false;
          prevDropdownState = this.props.dropdownState;
          const vendors = result.payload.data.data;
          this.setState({
            dataList: vendors,
          })
        })
    } else {
      this.props.getCustomers()
        .then((result) => {
          isLoading = false;
          prevDropdownState = this.props.dropdownState;
          const customer = result.payload.data.data;
          this.setState({
            dataList: customer,
          })
        })
    }
  }

  openModal() {
    this.setState({ open: true })
  }

  closeModal() {
    this.setState({ open: false })
  }

  escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  getSuggestions(value) {
    const escapedValue = this.escapeRegexCharacters(value.trim());
    const regex = new RegExp(escapedValue, 'i');
  
    return this.state.dataList.filter(customer => regex.test(customer.name));
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleChoose() {
    this.props.change('docGasAddForm', 'customerId', this.state.value);
    this.setState({ value: '' });
    this.closeModal();
  }

  render() {
    const { value, suggestions } = this.state;
    const { open } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      ...this.props.input,
      value,
      placeholder: 'ใส่ชื่อลูกค้า',
      onChange: this.onChange,
      className: 'form-control',
    };
    

    // const { touched, error, warning } = this.props.meta;

    // Finally, render it!
    return (
      <Fragment>
        <button className="btn btn-success btn-add-customer btn-sm" disabled={isLoading} onClick={ this.openModal } type="button">ค้นหาชื่อ</button>
        <Modal open={ open } onClose={this.closeModal} center>
          <div className="form-group">
            <label>{this.props.label}</label>
            <div className="row">
              <div className="col-8">
                <Autosuggest
                  suggestions={suggestions}
                  onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                  onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                  getSuggestionValue={this.getSuggestionValue}
                  shouldRenderSuggestions={shouldRenderSuggestions}
                  renderSuggestion={renderSuggestion}
                  inputProps={inputProps}
                />
              </div>
              <div className="col-4">
              <button className="btn btn-success" onClick={this.handleChoose} type="button">เลือก</button>
              </div>
            </div>
          </div>
        </Modal>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
	return {
    customerList: state.customerList , // fullgasPsiSize: state.gasPsiSize,
    dropdownState: state.appState,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getCustomers, change, getVendor
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerSuggest);




