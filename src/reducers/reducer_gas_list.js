import { GAS_LIST, GET_FULL_GAS, GAS_PSI_SIZE, GAS_STATUS, GET_NOT_FULL_GAS } from '../actions/index'

export default function( state = {data:[]}, action ){
	switch( action.type ){
		case GAS_LIST:
		case GET_FULL_GAS:
		case GET_NOT_FULL_GAS:
		case GAS_PSI_SIZE:
		case GAS_STATUS:
			return action.payload.data
		default:
			return state
	}
}