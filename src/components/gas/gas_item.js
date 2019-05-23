import React, { Component, Fragment } from 'react';

class GasItem extends Component {
  constructor(args) {
    super(args)
    this.data = this.props.data;
  }

  getVendorStyle(data) {
    return (
      <Fragment>
        <div className="col-3">
          <div className="gas-item gas-item--blank">
            <div className="gas-item__col">
                <button onClick={ () => {this.props.handleClick(data)} } ><i className="fa fa-angle-double-left"></i> เปลี่ยนถัง</button>
            </div>
          </div>
        </div>

        <div className="col-7">
          <div className="gas-item">
            <div className="gas-item__col gas-item__col--psi">
              <div className="gas-item__line1">psi</div>
              <div className="gas-item__line2">{data.psi}</div>
            </div>
            { data.holder? this.getUserHolder(data.holder) : '' }
            <div className="gas-item__col">
              <div className="gas-item__line1">7QBA17193</div>
              <div className="gas-item__line2">{data.sku}</div>
            </div>
            <div className="gas-item__col">
              <div className="gas-item__line1">เปลี่ยนล่าสุด</div>
              <div className="gas-item__line2">16 มิย. 2561</div>
            </div>
          </div>
        </div>
        
        <div className="col-2">
          <div className="gas-item">
            <div className="gas-item__col">
              <div className="gas-item__line1">สถานะ</div>
              <div className="gas-item__line2">ท่อเปลี่ยน</div>
            </div>
          </div>
        </div> 
      </Fragment>
    )
  }

  getUserHolder(holder) {
    return (
      <div className="gas-item__col">
        <div className="gas-item__line1">{holder.customerCode}</div>
        <div className="gas-item__line2">{holder.name}</div>
      </div>
    )
  }

  getLocalStyle(data) {
    return (
      <Fragment>
        <div className="col-3">
          <div className="gas-item">
            <div className="gas-item__col gas-item__col--psi">
              <div className="gas-item__line1">psi</div>
              <div className="gas-item__line2">{data.psi}</div>
            </div>
            <div className="gas-item__col">
              <div className="gas-item__line1">-</div>
              <div className="gas-item__line2">{data.sku}</div>
            </div>
          </div>
        </div>

        <div className="col-7">
          <div className="gas-item gas-item--blank">
            <div className="gas-item__col">
            </div>
          </div>
        </div>
        
        <div className="col-2">
          <div className="gas-item">
            <div className="gas-item__col">
              <div className="gas-item__line1">สถานะ</div>
              <div className="gas-item__line2">ท่อเปลี่ยน</div>
            </div>
          </div>
        </div> 
      </Fragment>
    )
  }

  render() {
    if (this.data.holderType === 'gasVendor' || this.data.holderType === 'customer') {
      return this.getVendorStyle(this.data);
    } else {
      return this.getLocalStyle(this.data);
    }
  }
}

export default GasItem;
