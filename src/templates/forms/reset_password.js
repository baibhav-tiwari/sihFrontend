import React,{Component} from 'react';
import {connect} from 'react-redux';
import {RiLockPasswordFill} from 'react-icons/ri';
import FormHeader from'../header/form__header';
import {Container} from 'react-bootstrap';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import './forms.css'
import {resetPassword} from '../../actions/index'
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import history from '../../history';

class ResetPass extends Component{
    constructor(props){
        super(props);
        this.state = {
            success:false,
            password:"",
            userId:"",
            token:"",
            errors:{
                password:""
            }
        }
    }
    componentDidMount(){
        if(this.props.auth.isSignedIn){
            history.push('/')
        }
        const token = this.props.match.params.token;
        const userId = this.props.match.params.id;
        this.setState({
            token, userId
        })
    }
    handleInputChange=(event)=>{
        const target = event.target;
        const name = target.name;
        this.setState({
          [name]: event.target.value
        });
    }
    validateForm = (data)=>{
        const {password} = data;
        let passwordError="", error=false;
        if(!password.trim())
        {
            passwordError="Password is required"
            error= true;
        }
        else if(password.length<6)
        {
            passwordError="Password must be 6 or more characters long"
            error= true;
        }
        
        this.setState(prevState => ({
            errors:{
                password:passwordError
            }
        }))
        
        return !error;
    }

    notifyFail = (message) => toast.error(message);
    notifySuccess = (message) => toast.success(message, {onClose:() => history.push("/login")});

    handleSubmit = async(event)=> {
        event.preventDefault();
        const isValid = this.validateForm(this.state);
        if(isValid){
            const {password, userId, token} = this.state;
            let data ={password, userId, token}
            console.log(data);
            await this.props.resetPassword(data);
            if(this.props.resetPass.error){
                this.notifyFail(this.props.resetPass.error);
            }else if(this.props.resetPass.message){
                this.notifySuccess(this.props.resetPass.message);
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
                    <Form.Group controlId="formBasicPassword">
                            <Form.Label><span className="form__icon"><RiLockPasswordFill/></span><span className="label__important">*</span> Password</Form.Label>
                            <div className="muted_text--forms"> Password must be at least 6 characters.</div>
                            <input name="password" className="form-control" type="password" value={this.state.password} placeholder="Password must be at least 6 characters" onChange={this.handleInputChange} />
                            <div className="invalid__feedback">{this.state.errors.password}</div>
                        </Form.Group>

                        <div className="form__btn">
                            <button className="btn" type="submit" onClick={this.handleSubmit}>
                                Reset password
                            </button>
                        </div>
                    </Form>
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

export default connect(mapStateToProps,{resetPassword})(ResetPass);