// Root Reducer
import {combineReducers} from 'redux';
import wines from './wineReducer';
import makers from './makerReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
    // Define all reducers needed to combine
    wines,
    makers,
    ajaxCallsInProgress
});

export default rootReducer;