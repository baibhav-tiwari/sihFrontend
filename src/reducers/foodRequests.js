import {ADD_REQUEST, REQUEST_FAILED, DELETE_FOOD_REQUEST, DELETE_FOOD_REQUEST_FAILED} from '../actions/actionTypes';
const INITIAL_STATE = {
    error:null,
    message:null, 
    data:null
}

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case ADD_REQUEST:
            return{...state, message:action.payload.msg, error:null, data:null}
        case REQUEST_FAILED:
            return{...state, message:null, error:action.payload.error, data:null}
        case DELETE_FOOD_REQUEST:
            return{...state, message:action.payload.message, error:null, data:null}
        case DELETE_FOOD_REQUEST_FAILED:
            return{...state, message:null, error:action.payload.error, data:null}
        default:
            return state
    }
}