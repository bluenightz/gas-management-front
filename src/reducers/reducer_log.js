import { GET_LOG } from '../actions'

export default function( state = [], action ){
	switch( action.type ){
		case GET_LOG:
			return action.payload.data.data
		default:
			return state
	}
}