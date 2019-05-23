import { TOGGLE_MENU, DOM_STATUS } from '../actions/index'

export default function( state = false, action ){
	switch( action.type ){
		case TOGGLE_MENU:
		case DOM_STATUS:
			return action.payload
		default:
			return state
	}
}