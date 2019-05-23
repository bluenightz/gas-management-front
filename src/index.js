import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import promise from 'redux-promise'
import { HashRouter } from 'react-router-dom'
import url1 from '../assets/vendor/bootstrap/dist/css/bootstrap.css'
// import url2 from "../assets/vendor/bootstrap-daterangepicker/daterangepicker.css"
import url3 from "../assets/bootstrap-grid.css"
import url4 from "../assets/styles/bootstrap.utility.css"
import url5 from "../assets/vendor/pace/themes/blue/pace-theme-minimal.css"
import url6 from "../assets/vendor/font-awesome/css/font-awesome.css"
import url7 from "../assets/vendor/animate.css/animate.css"
import url8 from "../assets/styles/app.css"
import url9 from "../assets/styles/app.skins.css"
import url10 from "../assets/styles/style.css"
import url11 from "../assets/react-table.css"

import LoginSection from './components/login_section';
import IntroSection from './components/intro_section';
import GasSection from './components/gas/gas_section';
import LindeList from './components/linde/list';
import GasAddSection from './components/gas/gas_add_section';
import DocGasAddSection from './components/doc/doc_gas_add_section';
import CustomerAddSection from './components/customer/customer_add_section';
import CustomerList from './components/customer/customer_list_component';
import CustomerOrderList from './components/customerOrder/customer_order_list_component';
import GasList from './components/gas/gas_list';
import reducers from './reducers';

let createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const divApp = document.createElement("div")
divApp.className = "app"

document.getElementsByTagName("body")[0].appendChild(divApp)

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
  	<HashRouter>
  		<Fragment>
  			<Switch>
					<Route path="/customer/list" component={CustomerList} />
  				<Route path="/login" component={LoginSection} />
  				<Route path="/intro" component={IntroSection} />
					<Route path="/linde/list" component={LindeList} />
					<Route path="/gas/add" component={GasAddSection} />
					<Route path="/gas/list" component={GasList} />
					<Route path="/gas" component={GasSection} />
					<Route path="/customer/add" component={CustomerAddSection} />
					<Route path="/doc/gas/add" component={DocGasAddSection} />
					<Route path="/doc/gas/list" component={CustomerOrderList} />
  				<Route exact path="/" component={LoginSection} />
  			</Switch>
  		</Fragment>
  	</HashRouter>
  </Provider>
  , document.querySelector('.app'));
