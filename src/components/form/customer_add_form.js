import React, { Component } from 'react'
import { Field, reduxForm, reset } from 'redux-form'
import { getGasPsiSize } from '../../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const validate = values => {
    const errors = {}
    
    if( !values.name ) {
        errors.name = "กรุณาระบุชื่อลูกค้า"
    }
    
    if( !values.customerCode ) {
        errors.customerCode = "กรุณาระบุรหัสลูกค้า"
    }

    return errors
}





class CustomerAddForm extends Component {

    constructor( props ) {
        super( props )
        this.state = {
          gasPsiSize: [],
        }
        this.renderOption = this.renderOption.bind(this);
    }

    componentWillMount() {
      this.props.initialize({ 
      })
    }
    
    renderField = ({
        input,
        label,
        type,
        meta: { touched, error, warning }
      }) => {

        return (
          <div className="form-group">
              <label>{label}</label>
              <input {...input} type={type} className="form-control" />
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
            <select {...input} type={type} className="form-control">
              { this.renderOption() }
            </select>
            {touched &&
              ((error && <span className="text-danger">{error}</span>) ||
                (warning && <span className="text-danger">{warning}</span>))}
        </div>
    )

    renderOption = () => {
      this.props.getGasPsiSize()
        .then((gasPsiSize) => {
          gasPsiSize.payload.data.data.unshift({ name: '' });
          console.log(gasPsiSize.payload.data.data);
          this.setState({ gasPsiSize: gasPsiSize.payload.data.data });
        })
      
      if (this.state.gasPsiSize.length == 0) {
        return <option value="default">เลือกความจุแก๊ส</option>
      } else {
        return _.map(this.state.gasPsiSize, (ele, index) => {
          if (index != 0) return <option value={ele.psi} key={`gas${index}`}>{`รหัส ${ele.name} psi: ${ele.psi}`}</option>
          return <option value="default" key={`gas${index}`}>เลือกความจุแก๊ส</option>
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
            <form className="form" onSubmit={ handleSubmit }>
                <Field type="text" readonly name="name" component={this.renderField} label="ชื่อลูกค้า" />
                <Field type="text" readonly name="customerCode" component={this.renderField} label="รหัสลูกค้า" />
                <div className="form-group text-right mt-4">
                    <button type="submit" className="btn btn-primary">ยืนยัน</button>
                </div>
            </form>
        )
    }

}


function mapStateToProps(state) {
	return {
    // fullgasPsiSize: state.gasPsiSize,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getGasPsiSize
	}, dispatch)
}

const afterSubmit = (result, dispatch) => dispatch(reset('customerAddForm'));

CustomerAddForm = connect(mapStateToProps, mapDispatchToProps)(CustomerAddForm);

export default reduxForm({ 
    form: 'customerAddForm' ,
    onSubmitSuccess: afterSubmit,
    validate
})(CustomerAddForm);