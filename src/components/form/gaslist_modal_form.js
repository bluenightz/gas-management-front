import React, { Component, Fragment } from 'react';
import { Field, reduxForm, reset } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


const validate = values => {
  const errors = {}
  
  // if( !values.name ) {
  //     errors.name = "กรุณาระบุชื่อลูกค้า"
  // }
  
  // if( !values.customerCode ) {
  //     errors.customerCode = "กรุณาระบุรหัสลูกค้า"
  // }

  return errors
}

class GasListModalForm extends Component {

  constructor(args) {
    super(args);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const { gasListStr } = this.props.order;
    const defaultValue = {};
    
    _.forEach( gasListStr, (ele, index) => {
      defaultValue[ele.sku] = ele.isLocal;
    });

    // this.props.initialize(defaultValue)
  }

  renderField = ({
    disabled,
    checked,
    input,
    label,
    type,
    className,
    placeholder,
    meta: { touched, error, warning }
  }) => {

    return (
      <input {...input} placeholder={placeholder} className={className} checked={checked} disabled={disabled} type={type} />
    )
  }

  getNewChangedSku(newChangedSku, sku) {
    return (newChangedSku)? newChangedSku : <Field type="text" className="" placeholder="รหัสถังซื้อใหม่" name={`${sku}___new___`} component={this.renderField} />;
  }

  getGasList(gasListStr) {
    if (this.props.type === 'buy') {
      return gasListStr.map((ele, index) => {
        const textClass = (ele.newChangedSku) ? 'text-success' : 'text-danger';
        return <li className="list_in_modal" key={`gas${index}`}>
          {this.isLocal(ele)} {ele.sku} <i className={`material-icons ${textClass}`}>swap_horiz</i> { this.getNewChangedSku(ele.newChangedSku, ele.sku) }
        </li>
      });
    } else {
      return gasListStr.map((ele, index) => <li className="list_in_modal" key={`gas${index}`}>{this.isLocal(ele)} รหัสถัง {ele.sku} ความจุ {ele.psi}</li>)
    }
  }

  isLocal({ isLocal, sku }) {
    // console.log('isLocal', isLocal);
    let html;
    if (isLocal === false ) {
      html = <Field type="checkbox" name={sku} component={this.renderField} />;
      // html = <input name="gaslist[]" value={sku} type="checkbox" className="" />;
    } else if (isLocal === true ) {
      html = <Field type="checkbox" name={sku} checked={true} disabled={true} component={this.renderField} />;
      // html = <input name="gaslist[]" value={sku} type="checkbox" className="" checked />;
    }
    return html;
  }

  handleSubmit(e) {    
    const { onSubmit } = this.props;
    onSubmit();
  }

  getDesc() {
    return (this.props.type === 'buy')? 'ติ๊กเพื่อรับถังแก๊สที่ทางร้านขายแก๊สส่งมาแล้ว จากนั้นกดยืนยัน' : 'ติ๊กเพื่อเลือกถังแก๊สที่รับคืน แล้วกดยืนยัน' ;
  }

  render() {

    const { error, handleSubmit, pristine, reset } = this.props
    const { gasList, orderNumber, gasListStr } = this.props.order;

    // console.log(gasListStr);
    return (
      <form onSubmit={ handleSubmit }>
        <h5 className="mr-5">รายละเอียดใบรายการ {orderNumber}</h5>
        <p>{ this.getDesc() }</p>
        <ul>
          {this.getGasList(gasListStr)}
        </ul>
        <div className="row">
          <div className="col-12 text-right">
            <button type="submit" className="btn btn-sm btn-success">ยืนยัน</button>
          </div>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
	return {
    // fullgasPsiSize: state.gasPsiSize,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({

  }, dispatch)
}

const afterSubmit = (result, dispatch) => dispatch(reset('gasListModalReturn'));

GasListModalForm = connect(mapStateToProps, mapDispatchToProps)(GasListModalForm);

export default reduxForm({ 
    form: 'gasListModalReturn' ,
    // onSubmitSuccess: afterSubmit,
    validate
})(GasListModalForm);