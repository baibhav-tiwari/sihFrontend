import React,{Component} from 'react';
import {connect} from 'react-redux';
import {AiOutlineMail} from 'react-icons/ai';
import FormHeader from'../header/form__header';
import {Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import './forms.css'
import {forgetPassword} from '../../actions/index'
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import history from '../../history';

class forgotPass extends Component{
    constructor(props){
        super(props);
        this.state = {
            email:"",
            success:false,
            errors:{
                email:""
            }
        }
    }
    
    componentDidMount(){
        if(this.props.auth.isSignedIn){
            history.push('/')
        }
    }

    handleInputChange=(event)=>{
        const target = event.target;
        const name = target.name;
        this.setState({
          [name]: event.target.value
        });
    }
    validateForm = (data)=>{
        const {email
        } = data;
        let emailError="", error=false;
        if(!email){
            emailError = "Email is required";
            error = true;            
        }
        else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email))
        {
            emailError = "Email address is Invalid";
            error= true;
        }
        
        this.setState(prevState => ({
            errors:{
                email:emailError
            }
        }))
        
        return !error;
    }

    notifyFail = (message) => toast.error(message);
    notifySuccess = (message) => toast.success(message);

    handleSubmit = async(event)=> {
        event.preventDefault();
        const isValid = this.validateForm(this.state);
        if(isValid){
            const {email} = this.state;
            console.log({email});
            await this.props.forgetPassword({email});
            if(this.props.resetPass.error){
                this.notifyFail(this.props.resetPass.error);
            }else if(this.props.resetPass.message){
                this.notifySuccess(this.props.resetPass.message);
                this.setState({success: true, email:""})
            }
        }
        
    }
    render(){
        return(
        <div>
            <FormHeader/>
            <ToastContainer/>
            <div className="forms__section">
                <Container>
                <Jumbotron className="form__content__div">
                    <div className="form__heading">
                        <h2>Reset Password</h2>
                    </div>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label><span className="form__icon"><AiOutlineMail/></span><span className="label__important">*</span> Email address</Form.Label>
                            <input name="email" className="form-control" type="email" value={this.state.email} placeholder="Enter email" onChange={this.handleInputChange} />
                            <div className="invalid__feedback">{this.state.errors.email}</div>
                        </Form.Group>

                        {this.state.success && <div>
                            <p className="email__confirmation"> Email reset link has been sent on your email id. It is valid for 15 minutes only. Kindly check your email to proceed with further steps.</p>
                        </div> }

                        <div className="form__btn">
                            <button className="btn" type="submit" onClick={this.handleSubmit}>
                                Generate link
                            </button>
                        </div>
                    </Form>
                    <div className="form__other__text">
                        New user? <Link to="/signup">Sign Up</Link>
                    </div>
                    </Jumbotron>
                </Container>
            </div>
        </div>
        );
    }
}

const mapStateToProps = (state, ownProps)=>{
    return({
        ...ownProps,
        resetPass: state.resetPassword,
        auth: state.auth
    })

}

export default connect(mapStateToProps,{forgetPassword})(forgotPass);