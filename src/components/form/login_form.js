import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

const validate = values => {
    const errors = {}
    if( !values.name ) {
        errors.name = "กรุณากรอกชื่อผู้ใช้"
    }

    if( !values.password ) {
        errors.password = "กรุณากรอกรหัสผ่าน"
    }

    return errors
}
const renderField = ({
    icon,
    input,
    label,
    type,
    meta: { touched, error, warning }
  }) => (
    <div className="form-group">
        <label><i className="material-icons">{icon}</i> {label}</label>
        <input {...input} placeholder={label} type={type} className="form-control" />
        {touched &&
          ((error && <span className="text-danger">{error}</span>) ||
            (warning && <span className="text-danger">{warning}</span>))}
    </div>
)

class LoginForm extends Component {

    constructor( props ) {
        super( props )
    }

    handleSubmit() {
        const { onSubmit } = this.props
        onSubmit()
    }

    render() {
        const { error, handleSubmit, pristine, reset } = this.props

        return (
            <form className="form" onSubmit={ handleSubmit }>
                <Field type="text" name="name" component={renderField} icon="perm_identity" label="ชื่อผู้ใช้" />
                <Field type="password" name="password" component={renderField} icon="vpn_key" label="รหัสผ่าน" />
                <div className="form-group text-right mt-4">
                    <button type="submit" className="btn btn-primary btn-icon"><i className="material-icons">lock_outline</i>เข้าสู่ระบบ</button>
                </div>
            </form>
        )
    }

}

export default reduxForm({ 
    form: 'login' ,
    validate
})(LoginForm);