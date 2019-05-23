import axios from 'axios'
import { API_ROOT } from '../config'
import { getOptionHeaderToken } from '../utils/token';

export const GAS_LIST = 'gas_list';
export const GAS_PSI_SIZE = 'gas_psi_size';
export const GET_FULL_GAS = 'get_full_gas';
export const GET_NOT_FULL_GAS = 'get_not_full_gas';
export const SET_REPLACE_GAS = 'set_replace_gas';
export const GET_CUSTOMERS = 'get_customers';
export const GET_VENDORS = 'get_vendors';
export const CREATE_CUSTOMER_ORDER = 'create_customer_order';
export const GAS_STATUS = 'gas_status';
export const TOGGLE_MENU = 'toggle_menu';
export const BASIC_LIST_FETCH = 'basic_list_fetch';
export const DOM_STATUS = 'dom_status';

const options = getOptionHeaderToken();

export function setReplaceGas(gasData) {
  return {
    type: SET_REPLACE_GAS,
    payload: gasData,
  }
}

export function setDomStatus(dom, status) {
  return {
    type: DOM_STATUS,
    payload: `${dom}_${status}`,
  }
}

export function toggleMenu(state) {
  const app = document.querySelector('.app');

  if (app.classList.contains('offscreen')) {
    app.classList.remove('offscreen', 'move-right');
  } else {
    app.classList.add('offscreen', 'move-right');
  }

  return {
    type: TOGGLE_MENU,
    payload: false,
  }
}

export function getFullGas() {

  const request = axios.get(`${API_ROOT}/gas/getFullGas`, options)


  return {
    type: GET_FULL_GAS,
    payload: request,
  }
}

export function getNotFullGas() {

  const request = axios.get(`${API_ROOT}/gas/getNotFullGas`, options)


  return {
    type: GET_NOT_FULL_GAS,
    payload: request,
  }
}

export function createCustomerOrder(postData) {

  console.log(postData);

  const request = axios.post(`${API_ROOT}/customerOrder`, {data: postData}, options)

  return {
    type: CREATE_CUSTOMER_ORDER,
    payload: request,
  }
}

export function getCustomers() {

  const request = axios.get(`${API_ROOT}/customer`, options)


  return {
    type: GET_CUSTOMERS,
    payload: request
  }
}

export function getVendor() {

  const request = axios.get(`${API_ROOT}/vendor`, options)


  return {
    type: GET_VENDORS,
    payload: request
  }

}

export function getGasList() {

  const request = axios.get(`${API_ROOT}/gas`, options)


  return {
    type: GAS_LIST,
    payload: request
  }
}

export function getGasPsiSize() {

  const request = axios.get(`${API_ROOT}/gas/getGasPsiSize`, options)


  return {
    type: GAS_PSI_SIZE,
    payload: request
  }
}

export function getGasStatus() {

  const request = axios.get(`${API_ROOT}/gas/getGasStatus`, options)


  return {
    type: GAS_STATUS,
    payload: request
  }
}

export function basicListFetch(apiPath) {
  
  const request = axios.get(`${API_ROOT}${apiPath}`, options)
  const pathTrimFirstSlash = apiPath.replace(/^\//, '')


  return {
    type: BASIC_LIST_FETCH,
    payload: request,
    meta: { path: pathTrimFirstSlash },
  }
}