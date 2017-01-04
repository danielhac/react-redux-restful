import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function makerReducer(state = initialState.makers, action) {
    switch(action.type) {
        case types.LOAD_MAKERS_SUCCESS:
            return action.makers;

        // Creates copy of existing array held in state and includes new maker saved in new array
        case types.CREATE_MAKER_SUCCESS:
            return [
                ...state,
                Object.assign({}, action.maker)
            ];

        // filter: part of ES6 to get list of all makers except for the single maker being updated
        // ...: creates brand-new array out of filtered results returned from filter
        case types.UPDATE_MAKER_SUCCESS:
            return [
                ...state.filter(maker => maker.id !== action.maker.id),
                Object.assign({}, action.maker)
            ];

        case types.DELETE_MAKER_SUCCESS:
            return [
                ...state.filter(maker => maker.id !== action.makerId)
            ];

        default:
            return state;
    }
}