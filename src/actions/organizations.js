// import { record, authRecord } from '../apis/feed_needy';
// import { ADD_ORGANIZATION, ADD_ORGANIZATION_FAILED, FETCH_ORGANIZATION_FAILED, FETCH_ORGANIZATION } from '../actions/actionTypes';
// export const addOrganization = (orgDetails) => async (dispatch, getState) => {
//     try {
//         await record.post('/organization', orgDetails);
//         const message = "Organization has been added successfully"
//         dispatch({ type: ADD_ORGANIZATION, payload: { msg: message } });
//     } catch (e) {
//         let error = e;
//         // console.log(e.response);
//         if (e.response) {
//             if (e.response.data.code === 11000) {
//                 error = "An organization with this email Id is already registered";
//             } else {
//                 error = e.response.statusText;
//             }
//         }
//         dispatch({ type: ADD_ORGANIZATION_FAILED, payload: { error } })
//     }

// }

// export const fetchOrganizations = (data) => async (dispatch, getState) => {
//     let token = getState().auth.token;
//     const { Limit, Skip, requestType, city, state, country, postalCode } = data;
//     try {
//         const response = await authRecord(token).get('/organization', {
//             params: {
//                 Limit, Skip, requestType, city, state, country, postalCode
//             }
//         });

//         dispatch({ type: FETCH_ORGANIZATION, payload: response.data });
//     } catch (e) {
//         // console.log("Error",e);
//         dispatch({ type: FETCH_ORGANIZATION_FAILED, payload: { error: "Loading failed. Make sure that you are logged In." } })
//     }
// }