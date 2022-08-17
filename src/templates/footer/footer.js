import React, { Component } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import Logo from '../../styles/img/footer.png';
import './footer.css'
import { Container, Row, Col, Image } from 'react-bootstrap';

class footer extends Component {
    render() {
        return (
            <div>

                <footer>
                    <div className="footerSection">
                        <Container>
                            <div className="footerSectionInner">
                                <Row>
                                    <Col md={6} className="footerColumn">
                                        <div className="footerHeading"> About Us</div>
                                        <div className="footerContent">
                                            We provide a gateway for the funding agencies(Govt./Pvt.) to contribute their funds to enhance the quality of education being delivered by Higher Education eco-system in India, the Financial assistance being provided by several funding agencies under respective notified schemes/projects. The agencies can be categorized into government, government-aided or private, as applicable.
                                        </div>
                                    </Col>

                                    <Col md={6} className="footerColumn">
                                        <div className="footerHeading"> Contact Us</div>
                                        <div className="footerContent">
                                            <Row><div id="address">
                                                CAMPUS-2 19thKM STONE NH-9,VIJAY NAGAR
                                                GHAZIABD UTTAR-PRADESH, INDIA
                                            </div>
                                            </Row>
                                            {/* <Row><div><span className= "contact_icons"><FiPhoneCall/></span>+91-1234567890</div></Row> */}
                                            <Row><div><span className="contact_icons"><AiOutlineMail /></span>
                                                ThePortan37@gmail.com
                                            </div></Row>


                                        </div>
                                    </Col>
                                </Row>
                                <br />
                                <hr></hr>
                                <br />
                                <div className="">
                                    <Row className="footer__logo">
                                        <Image src={Logo} className="footer__brandlogo" fluid />
                                    </Row>
                                    <Row>

                                    </Row>
                                </div>
                                <p style={{ fontSize: '1.2rem', color: '#fff' }}>Made with ❤️ by <a href="https://github.com/baibhav-tiwari" target="blank">THE OPTIMIZERS</a>.
                                    Don't forget to <a href="https://github.com/baibhav-tiwari/portan" target="blank">star this project</a>, if you liked it</p>

                                <p>&#169;	2022. All rights Reserved.</p>
                            </div>
                        </Container>
                    </div>



                </footer>
            </div>
        );
    }
}
export default footer;