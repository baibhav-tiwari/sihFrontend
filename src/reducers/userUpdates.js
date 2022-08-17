import {UPDATE_FORM, UPDATE_FAILED} from '../actions/actionTypes';
const INITIAL_STATE = {
    error:null,
    message:null
}

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case UPDATE_FORM:
            return{...state, message:action.payload.msg, error:null}
        case UPDATE_FAILED:
            return{...state, message:null, error:action.payload.error}
        default:
            return state
    }
}