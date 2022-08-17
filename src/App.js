import React from 'react';
import {Router, Switch, Route, Redirect} from "react-router-dom"
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import ScrollToTop from './scrollToTop';
import Header from './templates/header/header';
import Footer from './templates/footer/footer';
import Home from './templates/home';
import SignUp from './templates/forms/signup';
import Login from './templates/forms/login';
import Logout from './templates/forms/logout';
import Register from './templates/forms/register';
import ForgetPassword from './templates/forms/forgot_password';
import ResetPassword from './templates/forms/reset_password';
import Contribute from './templates/contribute/contribute'
import DonateFood from './templates/forms/donate_food/donate_food';
import GetFood from './templates/forms/get_food/get_food';
import history from './history';
import Profile from './templates/profile/user_profile'
import DonateRequest from './templates/requests/donation_requests'
import NeedRequest from './templates/requests/need_requests'
import Organizations from './templates/requests/organizations'
import './App.css';
import {getUserDetails} from './actions/index'

function PrivateRoute({ userAuth, children, ...rest }) {
  let auth = userAuth;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.isSignedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
const userProfileFetch = async (props)=>{
  await props.getUserDetails();
}

function App(props) {
  if (props){
    userProfileFetch(props);
  }
  
  return (
    <Router history={history}>
      
    <div>
      <ScrollToTop/>
      <Switch>
        <Route path="/login"><Login/></Route>
        <Route path="/signup"><SignUp/></Route>
        <PrivateRoute userAuth={props.auth} path="/logout"><Logout/></PrivateRoute>
        <Route path="/forgot_password"><ForgetPassword/></Route>
        <Route exact path="/reset_password/:id/:token" component={ResetPassword}/>
        <Route path="/register"><Register/></Route>

        <Route path="/contribute"><Contribute/></Route>
        <PrivateRoute userAuth={props.auth} path="/donate"><DonateFood/></PrivateRoute>
        <PrivateRoute userAuth={props.auth} path="/getFood"><GetFood/></PrivateRoute>
        <PrivateRoute userAuth={props.auth} exact path="/user_profile/:userId" component={Profile}/>
        <PrivateRoute userAuth={props.auth} path="/donate_requests"><DonateRequest/></PrivateRoute>
        <PrivateRoute userAuth={props.auth} path="/need_requests"><NeedRequest/></PrivateRoute>
        <PrivateRoute userAuth={props.auth} path="/organizations"><Organizations/></PrivateRoute>
        <Route path="/">
          <Header/>
          <Home/>
        </Route>
      </Switch>
      <Footer/>
    </div>
    </Router>
  );
}

const mapStateToProps = state =>{
  return{
    auth:state.auth
  }
}

export default connect(mapStateToProps, {getUserDetails})(App);
