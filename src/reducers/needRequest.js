import {REQUEST_FAILED, FETCH_NEED_REQUEST} from '../actions/actionTypes';
const INITIAL_STATE = {
    error:null,
    message:null, 
    data:null
}

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case REQUEST_FAILED:
            return{...state, message:null, error:action.payload.error, data:null}
        case FETCH_NEED_REQUEST:
            return {...state, message:"Success", error:null, data:action.payload}
        default:
            return state
    }
}