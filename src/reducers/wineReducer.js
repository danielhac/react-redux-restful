import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function wineReducer(state = initialState.wines, action) {
    switch(action.type) {
        case types.LOAD_WINES_SUCCESS:
            return action.wines;

        // Creates copy of existing array held in state and includes new wine saved in new array
        case types.CREATE_WINE_SUCCESS:
            return [
                ...state,
                Object.assign({}, action.wine)
            ];

        // filter: part of ES6 to get list of all wines except for the single wine being updated
        // ...: creates brand-new array out of filtered results returned from filter
        case types.UPDATE_WINE_SUCCESS:
            return [
                ...state.filter(wine => wine.id !== action.wine.id),
                Object.assign({}, action.wine)
            ];

        case types.DELETE_WINE_SUCCESS:
            return [
                ...state.filter(wine => wine.id !== action.wineId)
            ];

        default:
            return state;
    }
}