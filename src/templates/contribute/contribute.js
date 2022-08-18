import React, { Component } from 'react'
import { Container, Card, CardDeck, Row, Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import Header from '../header/header.js'
import FoodDonation from '../../styles/img/food_donation_sized.png'
import NeedFood from '../../styles/img/HungryWoman.jpg';
import SaveEarth from '../../styles/img/save_world.jpg';
import WasteFood from '../../styles/img/food_trash.jpg';
import HelpHand from '../../styles/img/helping_hand.jpg';
import HandShakeIcon from '../../styles/img/hand_shake_icon.jpg';
import OrganizationWorker from '../../styles/img/organization_worker_sized.jpg'
import './contribute.css'

export default class contribute extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="outermost__container">
                    <Container>
                        <div className="new__section section__c">
                            <div className="section__title">
                                <h3 className="section__header">
                                    Why contribute?
                                </h3>
                            </div>
                            <div className="section__content">
                                <Row>
                                    <Col md={3} sm={6} xs={6} className="features__feature">

                                        <Image src={HelpHand} className="features__image" />
                                        <h3 className="features__heading">
                                            Help needful
                                        </h3>
                                        <p className="features__content">
                                            Every bite of donated food will be used to fill the stomach of needy people, who find it difficult to afford food expenses.
                                        </p>
                                    </Col>

                                    <Col md={3} sm={6} xs={6} className="features__feature">

                                        <Image src={WasteFood} className="features__image" />
                                        <h3 className="features__heading">
                                            Reduce food Wastage
                                        </h3>
                                        <p className="features__content">
                                            Distributing excess amount of food to ones who need it helps in proper utilization of food.
                                        </p>
                                    </Col>

                                    <Col md={3} sm={6} xs={6} className="features__feature">

                                        <Image src={SaveEarth} className="features__image" />
                                        <h3 className="features__heading">
                                            Save Environment
                                        </h3>
                                        <p className="features__content">
                                            Reducing food wastage results in reducing the methane emissions from landfills and lowers the carbon footprint
                                        </p>
                                    </Col>

                                    <Col md={3} sm={6} xs={6} className="features__feature">

                                        <Image src={HandShakeIcon} className="features__image" />
                                        <h3 className="features__heading">
                                            Strengthens Community
                                        </h3>
                                        <p className="features__content">
                                            Food distribution among local areas ensures that you have a safe and healthy community around you.
                                        </p>
                                    </Col>
                                </Row>

                            </div>
                        </div>


                        <section className="new__section" id="contribute__section">

                            <div className="section__title">
                                <h3 className="section__header">
                                    Ways To Contribute
                                </h3>
                            </div>

                            <div className="section__content card__section">
                                <p>You can become an intervention of change in this project. Each contribution matters a lot.
                                    We strongly believe in community participation. A good community can change the future and bring the hunger to an end.
                                    You can participate in this campaign in one of the following ways:</p>

                                <CardDeck>
                                    <Card className="contribute__card">
                                        <Card.Img className="contribute__card__img" variant="top" src={FoodDonation} fluid="true" />
                                        <Card.Body>
                                            <Card.Title>Donate Food</Card.Title>
                                            <Card.Text>
                                                You can help others by donating untouched excess food.
                                                One of the representative from a food organization will collect it from you and distribute it among needy people.
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer className="contribute__card__footer">
                                            <Link to="/donate" className="btn contribute__card__btn">Donate Food &#8594;</Link>
                                        </Card.Footer>
                                    </Card>

                                    <Card className="contribute__card">
                                        <Card.Img className="contribute__card__img" variant="top" src={NeedFood} fluid="true" />
                                        <Card.Body>
                                            <Card.Title>Need Food</Card.Title>

                                            <Card.Text>
                                                If you are in need of food, then register a request to us. We will soon arrange food for you. We will help you in the best possible way.
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer className="contribute__card__footer">
                                            <Link to="/getFood" className="btn contribute__card__btn">Get food &#8594;</Link>
                                        </Card.Footer>
                                    </Card>

                                    <Card className="contribute__card">
                                        <Card.Img className="contribute__card__img" variant="top" src={OrganizationWorker} fluid="true" />
                                        <Card.Body>
                                            <Card.Title>Part of an Organization? </Card.Title>
                                            <Card.Text>
                                                You can help in collecting, storing and distributing food. You also need to ensure that food is hygenic and safe to eat.
                                                <br />
                                                Following links can be useful:
                                                <div style={{ marginLeft: '1.2rem' }}>
                                                    <ul>
                                                        <li> <Link to="/donate_requests">Food Donation Requests</Link></li>
                                                        <li> <Link to="/need_requests">Need food Requests</Link></li>
                                                    </ul>
                                                </div>
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer className="contribute__card__footer">
                                            <Link to="/signup" className="btn contribute__card__btn">Register Organization &#8594;</Link>
                                        </Card.Footer>
                                    </Card>
                                </CardDeck>
                            </div>

                        </section>

                        <div className="new__section">
                            <div className="section__title">
                                <h3 className="section__header">
                                    Steps to Contribute
                                </h3>
                            </div>
                            <div className="section__content">
                                <div className="styled__list">
                                    <ol className="gradient__list">
                                        <li><Link to="/login" className="styled__list__links">Login</Link> to your Portan account.</li>
                                        <li>Register a <Link to="/donate" className="styled__list__links">Donation</Link> or <Link to="/getfood" className="styled__list__links"> Fund you can provide</Link> request by filling a form.</li>
                                        <li>See and go through different HEI's who needed funds.</li>
                                        <li>Congratulations, you have contributed for a good cause.</li>
                                    </ol>
                                </div>
                            </div>

                        </div>

                    </Container>
                </div>
            </div>
        )
    }
}
