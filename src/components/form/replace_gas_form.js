import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { getFullGas } from '../../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const validate = values => {
    const errors = {}
    // if( !values.formActionType ) {
    //     errors.formActionType = "กรุณากรอกประเภท"
    // }

    // if( !values.replaceGasCode ) {
    //     errors.replaceGasCode = "กรุณากรอกรหัสถังรับคืน"
    // }

    if( !values.newGasCode ) {
        errors.newGasCode = "กรุณากรอกรหัสถังส่งคืนลูกค้า"
    }

    if( !values.docNumber ) {
        errors.docNumber = "กรุณากรอกหมายเลขเอกสาร"
    }

    return errors
}





class ReplaceGasForm extends Component {

    constructor( props ) {
        super( props )
        this.state = {
          gasList: [],
        }
        this.renderOption = this.renderOption.bind(this);
    }

    componentWillMount() {
      this.props.initialize({ 
        formActionType: 'เปลี่ยนถัง' ,
        customerName: `${this.props.replaceGas.holder.customerCode} (${this.props.replaceGas.holder.name})` ,
        replaceGasCode: this.props.replaceGas.sku,
      })
    }
    
    renderField = ({
        input,
        label,
        type,
        defValue,
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
      this.props.getFullGas()
        .then((gasList) => {
          this.setState({ gasList: gasList.payload.data.data });
        })

      return _.map(this.state.gasList, (ele, index) => {
        return <option value={ele.sku} key={`gas${index}`}>{`รหัส ${ele.sku} psi: ${ele.psi}`}</option>
      })
    }

    handleSubmit() {
        const { onSubmit } = this.props
        onSubmit()
    }

    render() {
        const { error, handleSubmit, pristine, reset } = this.props
        
        return (
            <form className="form" onSubmit={ handleSubmit }>
                <Field type="text" readonly name="formActionType" component={this.renderField} defValue="เปลี่ยนถัง" label="ประเภท" />
                <Field type="text" readonly name="customerName" component={this.renderField} defValue={`${this.props.replaceGas.holder.customerCode} (${this.props.replaceGas.holder.name})`} label="รหัสลูกค้า" />
                <Field type="text" readonly name="replaceGasCode" component={this.renderField} defValue={this.props.replaceGas.sku} label="รหัสถังรับคืน" />
                <Field type="text" name="newGasCode" component={this.renderSelectField} label="รหัสถังส่งลูกค้า" />
                <Field type="text" name="docNumber" component={this.renderField} label="เลขที่เอกสาร" />
                <div className="form-group text-right mt-4">
                    <button type="submit" className="btn btn-primary">ยืนยัน</button>
                </div>
            </form>
        )
    }

}


function mapStateToProps(state) {
	return {
    fullGasList: state.gasList,
    replaceGas: state.replaceGas,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getFullGas
	}, dispatch)
}

ReplaceGasForm = connect(mapStateToProps, mapDispatchToProps)(ReplaceGasForm);

export default reduxForm({ 
    form: 'replaceGasForm' ,
    validate
})(ReplaceGasForm);