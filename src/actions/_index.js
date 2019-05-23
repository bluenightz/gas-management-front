import axios from 'axios'
import * as TEXT from '../const'
import { API_ROOT } from '../config'
import { getOptionHeaderToken } from '../utils/token'

export const CREATE_ITEM = "create_item"
export const CHANGE_QUANTITY = "change_quantity"
export const DELETE_ITEM = "delete_item"
export const CREATE_STOCK_TRANSACTION = "create_stock_transaction"
export const CLEAR_ITEM_LIST = "clear_item_list"
export const RESULT_FROM_SERVER = "result_from_server"
export const GET_MATERIAL_LIST = "get_material_list"
export const USER_LOGIN = "user_login"
export const SET_CURRENT_SELECTED = "set_current_selected"
export const GET_LOG = "get_log"
export const GET_ORDES = "get_orders"
export const CHECK_TOKEN = "check_token"
export const VALID_STATUS = "valid_status"

export function changeValidStatus(status) {
	return {
		type: VALID_STATUS,
		payload: status,
	}
}

export function isTokenValid2() {
	const options = getOptionHeaderToken();
	const request = axios.get(`${API_ROOT}/tokenCheck`, options);

	return {
		type: CHECK_TOKEN, 
		payload: request,
	}
}

export function clearItemList() {
	return {
		type: CLEAR_ITEM_LIST,
		payload: [],
	}
}

export function resultFromServer( result ) {
	return {
		type: RESULT_FROM_SERVER,
		payload: result,
	}
}

export function getMaterialList( catname ) {
	const request = axios.get(`${API_ROOT}/material/${catname}`);
	
	return {
		type: GET_MATERIAL_LIST,
		payload: request,
	}
}

export function userLogin( loginInfo ) {

	const endpoint = `${API_ROOT}/login`;
	const request = axios.post( endpoint, { data: loginInfo } );

	return {
		type: USER_LOGIN,
		payload: request,
	}
}

export function setCurrentSelected(sku){
	return {
		type: SET_CURRENT_SELECTED,
		payload: sku,
	}
}

export function createStockTransaction( transactionObj, callback ) {
	
	const endpoint = `${API_ROOT}/stock`;
	const options = getOptionHeaderToken();
	const request = axios.post( endpoint, { data: JSON.stringify(transactionObj) }, options )
							.then( (value) => {
								callback(value)
							})
							.catch( err => {
								alert(TEXT.SERVER_ERROR)
								console.log(err)
							})


	return {
		type: CREATE_STOCK_TRANSACTION,
		payload: request
	}
}

export function getLog() {
	
	const endpoint = `${API_ROOT}/logs/me`;
	const options = getOptionHeaderToken();
	const request = axios.get( endpoint, options );

	return {
		type: GET_LOG,
		payload: request
	}
}

export function getOrders() {
	
	const endpoint = `${API_ROOT}/orders/me`;
	const options = getOptionHeaderToken();
	const request = axios.get( endpoint, options );


	return {
		type: GET_ORDES,
		payload: request
	}
}

export function createItem( item ){
	return {
		type: CREATE_ITEM,
		payload: item
	}
}

export function changeQuantity( sku, quantity ){
	return {
		type: CHANGE_QUANTITY,
		payload: {
			sku: sku,
			quantity: quantity
		}
	}
}

export function deleteItem( sku ) {
	return {
		type: DELETE_ITEM,
		payload: {
			sku: sku
		}
	}
}