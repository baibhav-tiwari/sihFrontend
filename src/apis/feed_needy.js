import axios from 'axios';
const baseURL = "https://hunger-demons-backend.herokuapp.com/"
const devURL = "http://localhost:3001"
const record =  axios.create({
    baseURL:baseURL
})
const authRecord =(token) => axios.create({
    baseURL: baseURL,
    headers: {'Authorization': 'Bearer '+ token}
  });
export {authRecord, record}