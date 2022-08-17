import  {combineReducers} from 'redux';
import authReducer from './authReducer';
import addOrganizationReducer from './addOrganization';
import foodRequestReducer from './foodRequests';
import user_form_updatesReducer from './userUpdates';
import donateRequests from './donateRequest';
import needRequests from './needRequest';
import organizations from './organizations';
import profile from './profile';
import resetPassword from './resetPassword';
import userProfile from './userProfile';

export default combineReducers({
    auth:authReducer,
    addOrganization:addOrganizationReducer,
    foodRequest:foodRequestReducer,
    user_form_updates: user_form_updatesReducer,
    needRequests,
    donateRequests, 
    organizations,
    profile,
    resetPassword,
    userProfile
});
