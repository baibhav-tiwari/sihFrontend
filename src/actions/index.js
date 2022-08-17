import { record } from '../apis/feed_needy';
import { signUp, signIn, signOut, forgetPassword, resetPassword } from './auth'
import { addOrganization, fetchOrganizations } from './organizations'
import { addRequest, fetchRequests, fetchUserRequests, deleteFoodRequest } from './requests'
import { updateProfile, updateAddress, fetchProfile, getUserDetails } from './user';
//User Requests



//Auth
export { signUp };
export { signIn };
export { signOut };
export { forgetPassword };
export { resetPassword };

//Organizations
export { addOrganization };
export { fetchOrganizations }

//User
export { updateProfile };
export { updateAddress };
export { fetchProfile };
export { getUserDetails };

//Food Requestss
export { addRequest };
export { fetchRequests };
export { fetchUserRequests };
export { deleteFoodRequest };
//FOOD related
export const createFoodRequest = (formValues) => async (dispatch, getState) => {
    const response = await record.post('/foodrequests', { ...formValues });
    dispatchEvent({ type: 'CREATE_FOOD_REQUEST', payload: response.data });
}

