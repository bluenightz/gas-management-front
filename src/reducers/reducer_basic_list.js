import { BASIC_LIST_FETCH } from '../actions/index'

export default function( state = {}, action ){

	switch( action.type ){
    case BASIC_LIST_FETCH:
      return { ...state, [action.meta.path]: action.payload.data.data };
		default:
			return state;
	}
}