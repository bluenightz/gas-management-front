import React, { Component, Fragment } from 'react'
import moment from 'moment'
import { Field, reduxForm, reset, FieldArray, change } from 'redux-form'
import { getGasPsiSize, getGasStatus, setDomStatus } from '../../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DatePicker from './datepicker'
import CustomerSuggest from './customer_suggest'

let dropdownState;

const validate = values => {
    const errors = {}
    
    if( !values.orderNumber ) {
        errors.orderNumber = "กรุณาระบุเลขที่ใบงาน"
    }

    if( !values.customerId && dropdownState != 'buy' ) {
        errors.customerId = "กรุณาระบุรหัสลูกค้า"
    }

    return errors
}



class DocGasAddForm extends Component {

    constructor( props ) {
        super( props )
        
        this.state = {
          gasStatus: [],
          buyGasStatus: null,
        }

        this.renderOption = this.renderOption.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderTextbox = this.renderTextbox.bind(this);
    }

    componentWillMount() {
      this.props.initialize({ 
        orderNumber: '',
        customerId: '',
        customerHiddenId: '',
        orderDate: moment(),
        orderReturn: moment(),
      })
    }

    handleAdd = (fields) => {
      fields.push({});
    }

    renderTextbox(type, member) {
      if (type === 'sku') {
        return <Field
          name={`${member}.newChangedSku`}
          type="text"
          component={this.renderField}
          label="รหัสแก๊สนำเข้าใหม่"
        /> 
          
      } else if(type === 'psi') {
        return <Field
          readOnly
          name={`${member}.psi`}
          type="text"
          component={this.renderField}
          label="ความจุแก๊ส"
        />
          
      }
    }

    renderGasSelectedList = ({ label, fields, meta: { error, submitFailed } }) => {
      return (
        <Fragment>
            <label>{label}</label>
            <ul className="gaslist">
              <li className="gaslist-row">
                {submitFailed &&
                  error &&
                  <span>
                    {error}
                  </span>}
              </li>
              {fields.map((member, index) => 
                  <li key={index} className="gaslist-row">
                    <div className="gaslist-number">#{index + 1}</div>
                    <Field
                      readOnly
                      name={`${member}.sku`}
                      type="text"
                      component={this.renderField}
                      label="รหัสถัง"
                    />
                    {(this.state.buyGasStatus === 'buy')? this.renderTextbox('sku', member) : this.renderTextbox('psi', member)}
                    <Field
                      readOnly
                      name={`${member}._id`}
                      type="hidden"
                      component={this.renderField}
                    />
                    <div className="gaslist-btn-wrapper">
                      <button
                        className="btn btn-danger btn-sm"
                        type="button"
                        title="Remove Member"
                        onClick={() => fields.remove(index)}
                      >X ลบ</button>
                    </div>
                  </li>
              )}
            </ul>
        </Fragment>
      )
    }
    
    renderField = ({
        readOnly,
        input,
        label,
        type,
        meta: { touched, error, warning }
      }) => {
        return (
          <div className="form-group">
              <label>{label}</label>
              <input {...input} readOnly={readOnly} type={type} className="form-control" />
              {touched &&
                ((error && <span className="text-danger">{error}</span>) ||
                  (warning && <span className="text-danger">{warning}</span>))}
          </div>
        )
      }

    renderSelectField = ({
        input,
        label,
        type,
        meta: { touched, error, warning }
      }) => (
        <div className="form-group">
            <label>{label}</label>
            <select {...input} type={type} className="form-control" onChange={this.handleChange}>
              { this.renderOption() }
            </select>
            {touched &&
              ((error && <span className="text-danger">{error}</span>) ||
                (warning && <span className="text-danger">{warning}</span>))}
        </div>
    )

    handleChange(e) {
      const status = e.target.getElementsByTagName('option')[e.target.selectedIndex].dataset.label;
      this.props.change('docGasAddForm', 'gasStatus', e.target.value);
      this.setState({ 'buyGasStatus': status });
      dropdownState = status;
      this.props.change('docGasAddForm', 'customerId', '');
      this.props.change('docGasAddForm', 'customerHiddenId', '');
      this.props.setDomStatus('dropdown_gasStatus', status);
      switch(status){
        case 'buy':
          this.props.fetchGasList('notFull');
          break;
        default :
          this.props.fetchGasList();
          break;
      }
    }

    renderOption = () => {
      this.props.getGasStatus()
        .then((gasStatus) => {
          gasStatus.payload.data.data.unshift({ name: '' });
          this.setState({ gasStatus: gasStatus.payload.data.data });
        })
      
      if (this.state.gasStatus.length == 0) {
        return <option value="default">เลือกประเภทการซื้อ</option>
      } else {
        return _.map(this.state.gasStatus, (ele, index) => {
          if (index != 0) return <option value={ele._id} key={`gas${index}`} data-label={ele.name}>{`${ele.alt}`}</option>
          return <option value="default" key={`gas${index}`}>เลือกสถานะการซื้อ</option>
        })
      }
    }

    handleSubmit() {
        const { onSubmit } = this.props
        onSubmit()
    }

    render() {
        const { error, handleSubmit, pristine, reset } = this.props
        
        return (
            <Fragment>
            <form className="form" onSubmit={ handleSubmit }>
                <div className="row">
                  <div className="col-12 col-sm-4">
                    <Field type="text" name="orderNumber" component={this.renderField} label="เลขที่ใบงาน" />
                  </div>
                  <div className="col-12 col-sm-4">
                    <Field type="text" name="customerId" readOnly component={this.renderField} label="รหัสลูกค้า" />
                    <CustomerSuggest label="ค้นหาลูกค้า" dropdownState={this.state.dropdownState} />
                  </div>
                  <div className="col-12 col-sm-4">
                    <Field type="text" name="gasStatus" readOnly component={this.renderSelectField} label="สถานะการซื้อ" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-6">
                    <Field name="orderDate" component={DatePicker} label="วันที่ยืม" />
                  </div>
                  <div className="col-12 col-sm-6">
                    <Field name="orderReturn" component={DatePicker} label="วันที่คืน" />
                  </div>
                </div>
                <Field name="customerHiddenId" type="hidden" component={(e) => {
                  return <input {...e.input} type={e.type} />
                }} />
                
                <div className="row">
                  <div className="col-12">
                    <FieldArray name="gasList" component={this.renderGasSelectedList} label="รายการแก๊ส" />
                  </div>
                </div>
                
                <div className="form-group text-right mt-4">
                    <button type="submit" className="btn btn-primary">ยืนยัน</button>
                </div>
            </form>
            </Fragment>
        )
    }

}


function mapStateToProps(state) {
	return {
    // fullgasPsiSize: state.gasPsiSize,
    // dropdownStatus: state.appState,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
    getGasPsiSize, 
    getGasStatus,
    change,
    setDomStatus,
	}, dispatch)
}

const afterSubmit = (result, dispatch) => {
  return dispatch(reset('docGasAddForm'));
}

DocGasAddForm = connect(mapStateToProps, mapDispatchToProps)(DocGasAddForm);

export default reduxForm({ 
    form: 'docGasAddForm' ,
    onSubmitSuccess: afterSubmit,
    validate
})(DocGasAddForm);