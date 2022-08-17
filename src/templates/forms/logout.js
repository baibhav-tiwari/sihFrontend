import React,{Component} from 'react';
import {connect} from 'react-redux';
import FormHeader from'../header/form__header';
import './forms.css'
import {Container} from 'react-bootstrap'
import 'react-toastify/dist/ReactToastify.css';
import {signOut} from '../../actions/index';
import Loader from '../loader';
class logout extends Component{
    constructor(props){
        super(props);
        this.state = {
            message:""
        }
        
    }
    componentDidMount = async()=>{
        //initiate signout request
        let message;
        if(this.props.userStatus.isSignedIn && this.props.userStatus.token){
            await this.props.signOut(this.props.userStatus);
            if(this.props.userStatus.message){
                message= this.props.userStatus.message;
            }
        }else{
            message = "You are not signed In"
        }
        this.setState({
            message
        })
    }
    
    render(){
        return(
        <div>
            <FormHeader/>
            <div className="forms__section">
                    <Container>    
                        <div className="form__heading">
                            <h2>Logout </h2>
                        </div>
                        <h2>{this.state.message || <Loader/>}</h2>
                    </Container>
                
                
            </div>
            
        </div>
        );
    }
}
const mapStateToProps = (state=>{
    return {
        userStatus: state.auth};
 });
export default connect(mapStateToProps, {signOut})(logout);