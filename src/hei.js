import React from 'react';
import { Link } from 'react-router-dom';
import PersonFoodBasket from '../styles/img/about.png'
import TargetImage from '../styles/img/target.jpg';
import Puzzle from '../styles/img/puzzle.jpg';
import Handshake from '../styles/img/handshake.jpg';
import { Container, Row, Col, Image } from 'react-bootstrap';
import './home.css';

function home() {
    return (
        <div>
            <Container>
                <section className="new__section">
                    <Row>
                        <Col md={6}>
                            <Image src={PersonFoodBasket} className="section__side__image section__image--left" />
                        </Col>

                        <Col md={6}>
                            <div className="section__title">
                                <h3 className="section__header">
                                    Why PORTAN?
                                </h3>
                            </div>

                            <div className="section__content">
                                <p>
                                    We provide a gateway for the funding agencies(Govt./Pvt.) to contribute their funds to enhance the quality of education being delivered by Higher Education eco-system in India, the Financial assistance being provided by several funding agencies under respective notified schemes/projects. The agencies can be categorized into government, government-aided or private, as applicable. The measure focuses are as follows
                                </p>
                                <p>
                                    Gateway for the funding agencies to contribute their funds.
                                    Automated system to enable Online monitoring of the amount disbursement among the deserving HEI.
                                    COMMUNICATION without sharing contact details.
                                    Highly Scale-able platform.
                                </p>
                            </div>
                        </Col>

                    </Row>
                </section>


                <section className="new__section">
                    <Row>
                        <Col md={6}>
                            <div className="section__title">
                                <h3 className="section__header">
                                    Our Mission
                                </h3>
                            </div>

                            <div className="section__content">
                                <p>
                                    <b>Portan</b>  is a journey towards developing India’s top-ranked institutions  Globally top ranking institutions through improvement in their academic and infrastructure quality.
                                </p>
                                <p>
                                    We are particularly interested in financing the building of educational infrastructure, R&D infrastructure and thereby enabling the institutions to reach top rankings globally.
                                </p>
                            </div>
                        </Col>

                        <Col md={6}>
                            <Image src={TargetImage} className="section__side__image section__image--left" />
                        </Col>

                    </Row>
                </section>

                <section className="new__section">
                    <Row>

                        <Col md={6}>
                            <Image src={Puzzle} className="section__side__image section__image--left" />
                        </Col>

                        <Col md={6}>
                            <div className="section__title">
                                <h3 className="section__header">
                                    How We Work
                                </h3>
                            </div>

                            <div className="section__content">
                                <p>
                                    How long does the process take? How fast will I receive the money?
                                </p>
                                <p>
                                    Applying takes only a few minutes, but the funding process takes a bit longer. It all depends on the type of loan you need . Typically, from the moment you get approved, it takes no longer than two business days to get funding, sometimes even sooner.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </section>

                <section className="new__section">
                    <Row>
                        <Col md={6}>
                            <div className="section__title">
                                <h3 className="section__header">
                                    Collaborate With Us
                                </h3>
                            </div>

                            <div className="section__content">
                                <p>
                                    We would love to partner with organizations working towards a similar cause.  Reach out to us if you’re an
                                    private organization, or educational institute that can help in the collection of the funds.

                                    <br />
                                </p>
                                {/* <Link to="/signup" className="btn" >Register Now &#8594;</Link> */}
                            </div>
                        </Col>

                        <Col md={6}>
                            <Image src={Handshake} className="section__side__image section__image--left" />
                        </Col>

                    </Row>
                </section>
            </Container>
        </div>
    )
}

export default home;