import React, { Component, Fragment } from 'react';
import withAuth from '../utils/withAuth'
import BlankSidebarLayout from './layout/blank_sidebar';

class Intro extends Component {
  constructor(args) {
    super(args);
  }

  contentrender() {
    return (
      <Fragment>
        <h1 className="mb-5">โปรแกรมการจัดการแก๊ส</h1>
        <div className="row">
          <div className="col-12">
            <h5>วิธีใช้งาน</h5>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam dolor maiores molestias tempore soluta esse, rerum id modi, laboriosam architecto quas veniam nobis ullam? Accusamus aspernatur non tempore libero consectetur.</p>
            <ol>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
              <li>Lorem ipsum dolor sit amet.</li>
            </ol>
          </div>
        </div>
      </Fragment>
    );
  }

  render() {
    return <BlankSidebarLayout content={this.contentrender()} />
  }
}

export default withAuth(Intro)