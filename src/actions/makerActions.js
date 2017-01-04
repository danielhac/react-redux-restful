// In Production, i can contain actions for creating, updating, deleting makers

import * as types from './actionTypes';
import makerApi from '../api/mockMakerApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadMakersSuccess(makers) {
    return {type: types.LOAD_MAKERS_SUCCESS, makers};
}

export function createMakerSuccess(maker) {
    return {type: types.CREATE_MAKER_SUCCESS, maker};
}

export function updateMakerSuccess(maker) {
    return {type: types.UPDATE_MAKER_SUCCESS, maker};
}

export function deleteMakerSuccess(makerId) {
    return {type: types.DELETE_MAKER_SUCCESS, makerId};
}

export function loadMakers() {
    return dispatch => {
        dispatch(beginAjaxCall());
        return makerApi.getAllMakers().then(makers => {
            dispatch(loadMakersSuccess(makers));

            // document.getElementById("numOfMakers").innerHTML = `Number Brands: ${makers.length}`;

            // let findNumMakers = loadMakersSuccess(makers).makers;
            // let numMakers = 0;
            //
            // // console.log(findNumMakers);
            //
            // for (let i=0; i < findNumMakers.length; i++) {
            //     // console.log(findNumMakers[i]);
            //     numMakers += i;
            // }

            // console.log(makers.length);

        }).catch(error => {
            throw(error);
        });
    };
}

export function saveMaker(maker) {
    return function (dispatch, getState) {
        dispatch(beginAjaxCall());
        return makerApi.saveMaker(maker).then(savedMaker => {
            // Check id, Update or create maker
            maker.id ? dispatch(updateMakerSuccess(savedMaker)) :
                dispatch(createMakerSuccess(savedMaker));
        }).catch(error => {
            dispatch(ajaxCallError(error));
            throw(error);

        });
    };
}

export function deleteMaker(makerId) {
    return function (dispatch, getState) {

        const currentState = getState();

        let winesWithMaker = currentState.wines.filter(wine => wine.makerId === makerId);

        if (winesWithMaker.length <= 0) {
            dispatch(beginAjaxCall());
            return makerApi.deleteMaker(makerId).then(maker => {
                dispatch(deleteMakerSuccess(makerId));
            }).catch(error => {
                dispatch(ajaxCallError(error));
                throw(error);
            });
        } else {
            return new Promise((resolve, reject) => {
                reject();
            });
        }
    };
}