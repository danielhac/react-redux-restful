// For tracking the status of AJAX calls

import * as types from '../actions/actionTypes';
import initialState from './initialState';

// Check if action type ends in '_SUCCESS'
function actionTypeEndsInSuccess(type) {
    return type.substring(type.length - 8) == '_SUCCESS';
}

// Each reducer is a slice of state
// Handling same action in multiple reducers
// Since Thunks dispatch a success action when they complete,
// any action type that ends in success will now be handled here as well as in another reducer
export default function ajaxStatusReducer(state = initialState.ajaxCallsInProgress, action) {
    if (action.type == types.BEGIN_AJAX_CALL) {
        return state + 1;
    }

    // Check if action type ends in success
    else if (action.type == types.AJAX_CALL_ERROR || actionTypeEndsInSuccess(action.type)) {
        return state - 1;
    }

    return state;
}
