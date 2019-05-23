import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import withAuth from '../../utils/withAuth';
import ReactTable from 'react-table'
import matchSorter from 'match-sorter'
import { basicListFetch } from '../../actions'

import BlankSidebarLayout from '../layout/blank_sidebar';

class BasicList extends Component {
  
  constructor(args) {
    super(args);

    this.model = this.props.model || [];
    this.head = this.props.pagename || 'Insert Title';
    this.fetchData = this.fetchData.bind(this);
    this.pathTrimFirstSlash = this.props.apiPath.replace(/^\//, '')
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.props.basicListFetch(this.props.apiPath)
  }

  getDefaultFilterMethod(accessor) {
    if (accessor && accessor.search(/\./) >= 0) {
      return (filter, rows) => matchSorter(rows, filter.value, { keys: [item => item[accessor]] });
    } else {
      return (filter, rows) => matchSorter(rows, filter.value, { keys: [accessor] });
    }
  }

  getDefaultColumnOption(customObject) {
    const { accessor } = customObject;
    const defaultObject = {
      filterMethod: this.getDefaultFilterMethod(accessor),
      filterAll: true,
    }
    
    return {
      ...defaultObject,
      ...customObject,
    }
  }

  getColumns() {
    const result = [];
    this.model.forEach(ele => {
      result.push(this.getDefaultColumnOption(ele));
    });
    return result;
  }

  contentrender() {

    const columns = this.getColumns();
    

    return (
      <Fragment>
			  <h5 className="mb-3">{this.head}</h5>
        <div className="bg-white">
					<ReactTable 
						data={this.props.basicListData[this.pathTrimFirstSlash]} columns={columns} className="-striped -highlight" defaultPageSize={10} 
	        			filterable />
        </div>
      </Fragment>
    )
  }

  render() {
    return <BlankSidebarLayout content={this.contentrender()} />
  }

}

function mapStateToProps(state) {
	return {
    // gasList: state.gasList,
    basicListData: state.basicListData,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
    // getGasList, setReplaceGas
    basicListFetch,
	}, dispatch)
}

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(BasicList))
