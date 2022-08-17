import { authRecord} from '../apis/feed_needy';
import {ADD_REQUEST, REQUEST_FAILED, FETCH_DONATE_REQUEST, 
    FETCH_NEED_REQUEST, DELETE_FOOD_REQUEST, DELETE_FOOD_REQUEST_FAILED} from './actionTypes'

export const addRequest = (requestDetails) => async (dispatch,getState) =>{
    let token = getState().auth.token;
    try{
        await authRecord(token).post('/foodrequests', requestDetails);
        dispatch({type:ADD_REQUEST,payload:{msg:"Your request has been registered"}});
    }catch(e){
        dispatch({type:REQUEST_FAILED, payload:{error:"Your request can't be recorded. Please try again later."}})
    }
}

export const fetchRequests = (data) => async (dispatch,getState) =>{
    let token = getState().auth.token;
    const {Limit, Skip, requestType, city, state, country, postalCode} = data;
    try{
        const response = await authRecord(token).get('/foodrequests',{
            params:{
                Limit,Skip,requestType, city, state, country, postalCode
            }
        });
        if(requestType==="Donate")
            dispatch({type:FETCH_DONATE_REQUEST,payload:response.data});
        else if(requestType==="Need")
            dispatch({type:FETCH_NEED_REQUEST,payload:response.data});
        
    }catch(e){
        dispatch({type:REQUEST_FAILED, payload:{error:"Loading failed. Make sure that you are logged In."}})
    }
}

export const fetchUserRequests = (data) => async (dispatch,getState) =>{
    let token = getState().auth.token;
    const {Limit, Skip, requestType, city, state, country, postalCode,owner} = data;
    try{
        const response = await authRecord(token).get('/foodrequests/me',{
            params:{
                Limit,Skip,requestType, city, state, country, postalCode,owner
            }
        });
        if(requestType==="Donate")
            dispatch({type:FETCH_DONATE_REQUEST,payload:response.data});
        else if(requestType==="Need")
            dispatch({type:FETCH_NEED_REQUEST,payload:response.data});
        
    }catch(e){
        dispatch({type:REQUEST_FAILED, payload:{error:"Loading failed. Make sure that you are logged In."}})
    }
}

export const deleteFoodRequest = (data) => async (dispatch, getState)=>{
    let token = getState().auth.token;
    const postId =data.id;
    try{
        const response = await authRecord(token).delete(`/foodrequests/me/${postId}`);
        dispatch({type:DELETE_FOOD_REQUEST,payload:response.data});
        
    }catch(e){
        dispatch({type:DELETE_FOOD_REQUEST_FAILED, payload:{error:"Failed to delete request."}})
    }

}