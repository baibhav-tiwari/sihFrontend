import {FETCH_PROFILE, FETCH_PROFILE_FAILED} from '../actions/actionTypes';
const INITIAL_STATE = {
    error:null,
    message:null, 
    data:null
}

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case FETCH_PROFILE_FAILED:
            return{...state, message:null, error:action.payload.error, data:null}
        case FETCH_PROFILE:
            return {...state, message:"Success", error:null, data:action.payload.profile}
        default:
            return state
    }
}