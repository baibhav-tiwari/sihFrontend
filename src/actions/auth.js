import {record, authRecord} from '../apis/feed_needy';
import history from '../history';
import {SIGN_UP, AUTH_FAILED, SIGN_IN, SIGN_OUT, FORGOT_PASS, 
    FORGOT_PASS_FAILED, RESET_PASS, RESET_PASS_FAILED, RESET_USER_PROFILE} from './actionTypes'

export const signUp = (userDetails) => async (dispatch,getState) =>{
    try{
        const response = await record.post('/users', userDetails);
        localStorage.setItem('isSignedIn','true');
        localStorage.setItem('userId', response.data.user._id);
        localStorage.setItem('token',response.data.token);
        history.push('/');
        dispatch({type:SIGN_UP,payload:response.data});
    }catch(e){
        let error = e;
        console.log(e.response);
        if(e.response){
            if(e.response.data.code===11000){
                error = "This email id already exist"
            }else{
                error = e.response.statusText;
            }
        }
        dispatch({type:AUTH_FAILED, payload:{error}})
    }
}

export const signIn = (userDetails) => async (dispatch,getState) =>{
    try{
        const response = await record.post('/users/login', userDetails);
        localStorage.setItem('isSignedIn','true');
        localStorage.setItem('userId', response.data.user._id);
        localStorage.setItem('token',response.data.token);
        history.push('/');
        dispatch({type:SIGN_IN, payload:response.data});
    }catch(e){
        let error = e;
        console.log(e.response);
        if(e.response){
            if(e.response.data){
                error = e.response.data;
            }else{
                error = e.response.statusText;
            }
        }
        dispatch({type:AUTH_FAILED, payload:{error}})
    }

}

// auth record is a function that acceprts the auth token as an argument
export const signOut = (userDetails) => async (dispatch,getState) =>{
    const token = userDetails.token;
    try{
        await authRecord(token).post('/users/logout');
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('isSignedIn')
        // history.push('/logout');
        dispatch({type:SIGN_OUT, payload:{msg:"You have been logged out successfully"}});
        dispatch({type:RESET_USER_PROFILE, payload:""})
    }catch(e){
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('isSignedIn')
    }
    
}

export const forgetPassword = (userDetails) => async (dispatch,getState) =>{
    try{
        const response = await record.post('/users/forgot_password', userDetails);
        console.log(response.data.message);
        dispatch({type:FORGOT_PASS,payload:response.data});
    }catch(e){
        let error;
        if(e.response){
            if(e.response.status===401){
                error = e.response.data.message||"Unsuccessfull";
            }
            else{
                error = e.response.statusText;
            }
        }
        console.log(error);
        dispatch({type:FORGOT_PASS_FAILED, payload:{error}})
    }
}

export const resetPassword = (userDetails) => async (dispatch,getState) =>{
    try{
        const response = await record.post('/users/reset_password', userDetails);
        console.log(response.data);
        dispatch({type:RESET_PASS,payload:response.data});
    }catch(e){
        let error;
        if(e.response){
            if(e.response.status===401){
                error = e.response.data||"Unsuccessfull";
            }
            else{
                error = e.response.statusText;
            }
        }
        console.log(e.response.data);
        dispatch({type:RESET_PASS_FAILED, payload:{error}})
    }
}