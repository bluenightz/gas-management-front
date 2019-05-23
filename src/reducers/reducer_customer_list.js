import { GET_CUSTOMERS, CREATE_CUSTOMER_ORDER, GET_VENDORS } from '../actions/index'

export default function( state = [], action ){
	switch( action.type ){
		case GET_CUSTOMERS:
		case GET_VENDORS:
    case CREATE_CUSTOMER_ORDER:
      return action.payload.data
		default:
			return state
	}
}