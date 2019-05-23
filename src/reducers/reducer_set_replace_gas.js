import { SET_REPLACE_GAS } from '../actions/index'

export default function( state = {}, action ){
	switch( action.type ){
		case SET_REPLACE_GAS:
			return action.payload
		default:
			return state
	}
}