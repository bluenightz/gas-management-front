import Autosuggest from 'react-autosuggest';
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getMaterialList, setCurrentSelected } from '../actions'

// Imagine you have a list of materials that you'd like to autosuggest.
let materials = [];
let currentSelect = {};

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : materials.filter(material =>
    material.sku.toLowerCase().slice(0, inputLength) === inputValue
  );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => {
    console.log(suggestion)
    currentSelect = suggestion
    return suggestion.sku;
}

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    <div className="suggestion_sku">{suggestion.sku}</div>
    <div className="suggestion_mat_name">{suggestion.material_name}</div>
  </div>
);

class SearchMaterial extends Component {
  constructor(props) {
    super(props);

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: []
    };
  }

  componentDidMount() {
      this.props.getMaterialList('all')
			.then( res => {
                materials = res.payload.data.materials
			})
  }

  handleClick() {
    if( this.state.value.trim() != '' ){
        this.props.createItem()
        this.resetInput()
    }else{
        alert("กรุณากรอกรหัส sku")
    }
  }

  resetInput() {
      this.setState({ value: '' })
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
    this.props.setTerm(currentSelect)
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'ค้นหาจากรหัส sku',
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
        <div className="form-inline">
            <div className="form-group">
                <div className="input-group">
                    <div className="input-group-addon"><i className="material-icons">search</i></div>
                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps} />
                </div>
            </div>&nbsp;
            <button className="btn btn-default btn-icon" onClick={ () => { this.handleClick() } }><i className="material-icons">add</i>เพิ่ม</button>
        </div>
    );
  }
}

function mapStateToProps(state){
    return {
        productList: state.productList
    }
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		getMaterialList, setCurrentSelected
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchMaterial)