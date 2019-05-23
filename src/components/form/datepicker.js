import React, { Component, Fragment } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css'

class DatePickerComponent extends Component {

  constructor( args ){
    super( args );

    this.state = {
      date: moment(),
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(selectedDate) {
    this.setState({
      date: selectedDate
    })
  }

  render() {
    const { input: {name, onBlur, onChange, onDragStart, onDrop, onFocus} } = this.props
    return (
      <Fragment>
        <div className="form-group">
          <label>{this.props.label}</label>
          <DatePicker className="col-12 form-control" dateFormat="DD/MM/YYYY" selected={this.state.date} name={name} onBlur={onBlur} onDragStart={onDragStart} onDrop={onDrop} onFocus={onFocus} onChange={(e) => { onChange(); this.setState({ date: e }) }} />
        </div>
      </Fragment>
    )
  }

}

export default DatePickerComponent;