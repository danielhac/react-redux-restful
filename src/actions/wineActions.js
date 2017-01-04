import * as types from './actionTypes';
import wineApi from '../api/mockWineApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadWinesSuccess(wines) {
    return { type: types.LOAD_WINES_SUCCESS, wines };
}

export function createWineSuccess(wine) {
    return {type: types.CREATE_WINE_SUCCESS, wine};
}

export function updateWineSuccess(wine) {
    return {type: types.UPDATE_WINE_SUCCESS, wine};
}

export function deleteWineSuccess(wineId) {
    return {type: types.DELETE_WINE_SUCCESS, wineId};
}

// Thunk
export function loadWines() {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        return wineApi.getAllWines().then(wines => {
            dispatch(loadWinesSuccess(wines));
        }).catch(error => {
           throw(error);
        });
    };
}

// Thunk
// getState: useful when desire to access Redux store and get particular pieces of state w/o passing it as params,
// get direct access to get pieces of state
export function saveWine(wine) {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        return wineApi.saveWine(wine).then(savedWine => {
            // Check id, Update or create wine
            wine.id ? dispatch(updateWineSuccess(savedWine)) :
                dispatch(createWineSuccess(savedWine));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);

        });
    };
}

export function deleteWine(wineId) {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        return wineApi.deleteWine(wineId).then(wine => {
            dispatch(deleteWineSuccess(wineId));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);
        });
    };
}