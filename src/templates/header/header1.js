import React, { Component } from 'react';
import { connect } from 'react-redux';
import Logo from '../../styles/img/logo_transparent.png';
import { Image, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom';
import './header.css';

class header extends Component {
    renderUserStatus = () => {
        if (this.props.isSignedIn) {
            return (
                <>
                    <Link to="/logout" className="nav-link"><span className="NavLink">Logout</span></Link>
                    <Link to={"/user_profile/" + this.props.userStatus.userId} className="nav-link"><span className="NavLink">My Profile</span></Link>
                </>
            )
        }
        else {
            return (
                <>
                    <Link to="/login" className="nav-link"><span className="NavLink">Login</span></Link>
                    <Link to="/signup" className="nav-link"><span className="NavLink">Sign Up</span></Link>
                </>
            )
        }
    }

    render() {
        return (
            <div className="header__section">
                <header className="header">
                    <Navbar collapseOnSelect expand="lg" className="page__Navigation form__nav--sticky">
                        <Navbar.Brand>
                            <Link to="/"><Image src={Logo} className="d-inline-block align-top" id="CompanyImage" alt="company_logo" />{' '}</Link>
                        </Navbar.Brand>

                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="ml-auto RightNav">
                                <Link to="/contribute" className="nav-link"><span className="NavLink">Contribute</span></Link>

                                <NavDropdown title="Food Requests" id="food_requests_navbar" className="NavLink" style={{ color: "#4b4b4b" }}>
                                    <LinkContainer to="/donate_requests">
                                        <NavDropdown.Item className="nav-link">
                                            <span className="NavLink">Food Donations</span>
                                        </NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to="/need_requests">
                                        <NavDropdown.Item className="nav-link">
                                            <span className="NavLink">Need Food</span>
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>

                                <NavDropdown title="Add New Request" id="add_food_requests_navbar" className="NavLink">
                                    <LinkContainer to="/donate">
                                        <NavDropdown.Item className="nav-link">
                                            <span className="NavLink">Donate Food</span>
                                        </NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to="/getFood">
                                        <NavDropdown.Item className="nav-link">
                                            <span className="NavLink">Need Food</span>
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>

                                <NavDropdown title="Organizations" id="organizations_navbar" className="NavLink">
                                    <LinkContainer to="/organizations">
                                        <NavDropdown.Item className="nav-link">
                                            <span className="NavLink">Registered Organizations</span>
                                        </NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to="/register">
                                        <NavDropdown.Item className="nav-link">
                                            <span className="NavLink">Add New Organization</span>
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>

                                <NavDropdown.Divider />
                            </Nav>

                            <Nav className="ml-auto RightNav">
                                {this.renderUserStatus()}
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </header>
            </div>
        );
    }
}

const mapStateToProps = (state => {
    return {
        isSignedIn: state.auth.isSignedIn,
        userStatus: state.auth
    }
});
export default connect(mapStateToProps)(header);
