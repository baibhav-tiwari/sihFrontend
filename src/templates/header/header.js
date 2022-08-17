import React, { Component } from 'react';
import { connect } from 'react-redux';
import Logo from '../../styles/img/logo_transparent.png';
import FoodBasket from '../../styles/img/home.png';
import { Row, Col, Image, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'
import './header.css';
import { signOut } from '../../actions/index'

class header extends Component {

    renderUserStatus = () => {
        if (this.props.isSignedIn) {
            console.log(this.props.userStatus.userId);
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
                    <Link to="/login" className="nav-link"><span className="NavLink">LOGIN</span></Link>
                    <Link to="/signup" className="nav-link"><span className="NavLink">SIGN_UP</span></Link>
                </>
            )
        }
    }


    render() {
        return (
            <div className="header__section">
                <header className="header">
                    <Navbar collapseOnSelect expand="lg" className="page__Navigation">
                        <Navbar.Brand>
                            <Link to="/"><Image src={Logo} className="d-inline-block align-top" id="CompanyImage" alt="company_logo" />{' '}</Link>
                        </Navbar.Brand>

                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="ml-auto RightNav">
                                <Link to="/contribute" className="nav-link"><span className="NavLink">Donate</span></Link>

                                <NavDropdown title="Requests" id="food_requests_navbar" className="NavLink" style={{ color: "#4b4b4b" }}>
                                    <LinkContainer to="/donate_requests">
                                        <NavDropdown.Item className="nav-link">
                                            <span className="NavLink">Donations</span>
                                        </NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to="/need_requests">
                                        <NavDropdown.Item className="nav-link">
                                            <span className="NavLink">Need</span>
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>

                                {/* <NavDropdown title="Add New Request" id="add_food_requests_navbar" className="NavLink">
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
                                </NavDropdown> */}

                                {/* <NavDropdown title="Organizations" id="organizations_navbar" className="NavLink">
                                    <LinkContainer to="/organizations">
                                        <NavDropdown.Item className="nav-link">
                                            <span className="NavLink">LOGIN</span>
                                        </NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to="/signup">
                                        <NavDropdown.Item className="nav-link">
                                            <span className="NavLink">SIGNUP</span>
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown> */}

                                <NavDropdown.Divider />
                            </Nav>

                            <Nav className="ml-auto RightNav">
                                {this.renderUserStatus()}
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <div className="header__title">
                        <Row>
                            <Col sm={12} md={9}>
                                <h1>
                                    Where
                                    {/* <!-- Green highlight effect */}
                                    <span className="highlight"> Requirements </span>
                                    meets<br />
                                    <span className="highlight">Funds</span>
                                </h1>
                                <br />
                                <h4>Together we Raise and Together we Rise</h4>
                                <br />
                                <LinkContainer to="/contribute">
                                    <button className="header__btn__link btn--text btn--scroll-to">START &rarr;</button>
                                </LinkContainer>
                                <br />

                            </Col>
                            <Col sm={12} md={3}>
                                <div className="header__side__image">
                                    <Image src={FoodBasket} className="header__side__basketimage" />
                                </div>
                            </Col>
                        </Row>

                    </div>
                </header>
            </div>
        );
    }
}
const mapStateToProps = (state => {
    return {
        isSignedIn: state.auth.isSignedIn,
        userStatus: state.auth,

    };
});

export default connect(mapStateToProps, { signOut })(header);
