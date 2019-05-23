import { combineReducers } from 'redux';
import GasListReducer from './reducer_gas_list';
import AppState from './reducer_app_state';
import CustomerListReducer from './reducer_customer_list';
import BasicListReducer from './reducer_basic_list';
import SetReplaceGasReducer from './reducer_set_replace_gas';
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  appState: AppState,
  replaceGas: SetReplaceGasReducer,
  gasList: GasListReducer,
  basicListData: BasicListReducer,
  customerList: CustomerListReducer,
  form: formReducer,
});

export default rootReducer;
