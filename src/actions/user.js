import {record, authRecord} from '../apis/feed_needy';
import {UPDATE_FORM, UPDATE_FAILED, FETCH_PROFILE, FETCH_PROFILE_FAILED, GET_USER_PROFILE, GET_USER_PROFILE_FAILED} from './actionTypes'

export const updateProfile = (data) => async (dispatch,getState) =>{
    let token = getState().auth.token;
    const updates = Object.keys({...data});
    let formData = new FormData();
    updates.forEach((update) => {
        formData.append(update, data[update])
    } );

    try{
        await authRecord(token).patch('/users/me', 
            formData, {
                headers:{
                    "Content-type":"multipart/form-data"
                }
            }
        );

        dispatch({type:UPDATE_FORM,payload:{msg:"Your profile has been updated successfully"}});
    }catch(e){
        // console.log("Error",e);
        dispatch({type:UPDATE_FAILED, payload:{error:"Your request can't be recorded. Please try again later."}})
    }
}

export const updateAddress = (data) => async (dispatch,getState) =>{
    let token = getState().auth.token;
    try{
        await authRecord(token).patch('/users/me/address', data);

        dispatch({type:UPDATE_FORM,payload:{msg:"Your Address has been updated"}});
    }catch(e){
        dispatch({type:UPDATE_FAILED, payload:{error:"Your request can't be recorded. Please try again later."}})
    }
}
export const fetchProfile = (id)=>async(dispatch, getState)=>{
    const url = '/users/'+id;
    try{
        const response = await record.get(url);
        dispatch({type:FETCH_PROFILE,payload:{profile:response.data}});
    }catch(e){
        dispatch({type:FETCH_PROFILE_FAILED, payload:{error:e}})
    }
}

export const getUserDetails = ()=> async(dispatch, getState)=> {
    let auth = getState().auth;
    let {token, isSignedIn} = auth;
    if(isSignedIn){
        try{
            const response = await authRecord(token).get('/users/me');
            dispatch({type:GET_USER_PROFILE,payload:{profile:response.data}});
        }catch(e){
            // console.log(e.response);
            dispatch({type:GET_USER_PROFILE_FAILED,payload:{error:e.response}});

        }
    }
}