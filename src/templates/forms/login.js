import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AiOutlineMail } from 'react-icons/ai';
import { RiLockPasswordFill } from 'react-icons/ri';
import FormHeader from '../header/form__header';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import './forms.css'
import { signIn } from '../../actions/index';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import history from '../../history';

class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errors: {
                email: "",
                password: ""
            }
        }
    }
    componentDidMount() {
        if (this.props.auth.isSignedIn) {
            history.push('/')
        }
        if (this.props.foodRequest.error) {
            this.notifyFail("You need to login first to continue");
        }
    }
    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: event.target.value
        });
    }
    validateForm = (data) => {
        const { email, password } = data;
        let emailError = "", passwordError = "", error = false;
        if (!email) {
            emailError = "Email is required";
            error = true;
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            emailError = "Email address is Invalid";
            error = true;
        }
        if (!password.trim()) {
            passwordError = "Password is required"
            error = true;
        }
        else if (password.length < 6) {
            passwordError = "Password must be 6 or more characters long"
            error = true;
        }

        this.setState(prevState => ({
            errors: {
                email: emailError,
                password: passwordError
            }
        }))

        return !error;
    }

    notifyFail = (message) => toast.error(message);

    handleSubmit = async (event) => {
        event.preventDefault();
        const isValid = this.validateForm(this.state);
        if (isValid) {
            const { email, password } = this.state;
            await this.props.signIn({ email, password });

            if (this.props.auth.error) {
                this.notifyFail(this.props.auth.error);
            }
        }

    }
    render() {
        return (
            <div>
                <FormHeader />
                <ToastContainer />
                <div className="forms__section">
                    <Container>
                        <Jumbotron className="form__content__div">
                            <div className="form__heading">
                                <h2>Login</h2>
                            </div>
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label><span className="form__icon"><AiOutlineMail /></span><span className="label__important">*</span> Email address</Form.Label>
                                    <input name="email" className="form-control" type="email" value={this.state.email} placeholder="Enter email" onChange={this.handleInputChange} />
                                    <div className="invalid__feedback">{this.state.errors.email}</div>
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label><span className="form__icon"><RiLockPasswordFill /></span><span className="label__important">*</span> Password</Form.Label>
                                    <div className="muted_text--forms"> Password must be at least 6 characters.</div>
                                    <input name="password" className="form-control" type="password" value={this.state.password} placeholder="Password must be at least 6 characters" onChange={this.handleInputChange} />
                                    <div className="invalid__feedback">{this.state.errors.password}</div>
                                    <div style={{ marginTop: '0.8rem' }}>
                                        <Link to="/forgot_password">Forgot password</Link>
                                    </div>
                                </Form.Group>
                                <div className="form__btn">
                                    <button className="btn" type="submit" onClick={this.handleSubmit}>
                                        Login
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

const mapStateToProps = (state, ownProps) => {
    return ({
        ...ownProps,
        auth: state.auth,
        foodRequest: state.foodRequest
    })

}

export default connect(mapStateToProps, { signIn })(login);