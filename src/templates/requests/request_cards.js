import React from 'react'
import {Card} from 'react-bootstrap';
import { FadeTransform } from 'react-animation-components';
import {Link} from 'react-router-dom';
import {AiOutlineMail} from 'react-icons/ai';
import {FiPhoneCall} from 'react-icons/fi';
import {FaAddressCard, FaUserAlt} from 'react-icons/fa';
import {ImCalendar, ImBin} from 'react-icons/im';

const renderFoodDescription = (foodDescription)=>{
    return foodDescription.map(({foodName, quantity}, index)=>{
        return <Card.Subtitle tag="h6" className="mb-4 text-muted" key={index}><span className='fa fa-question-circle fa-lg question-icon'/>{foodName} for {quantity} persons</Card.Subtitle>
    })
}
const renderAddress = (address) =>{
    const {addressLine1, addressLine2, city, state, country, postalCode} = address;
    return(
        <><span className="card__content__heading">
        <span className="request__card--icon"><FaAddressCard/></span>
        Address: &nbsp;
    </span>
    {addressLine1}, {addressLine2}, {city.value}, {state}, {country}, {postalCode}</>
    )
    
}

export const renderCard = function(props){
    const FoodDetail = props.post;
    let {val, authId}= props;
    let isAuth =false;
    let {foodType, food_description, address, owner} = FoodDetail
    if(owner===authId)
        isAuth = true;
    foodType = foodType[0]
    address = address[0]

    return(
    <div className='request__card' key={val}>
    <FadeTransform in transformProps={{exitTransform: 'scale(0.5) translateY(-50%)'}}>
        <Card key={val}>
            <Card.Body>
                {isAuth && <Link to="#"><span className="delete__button--card" onClick={()=> props.deleteFoodRequest(FoodDetail._id)}><ImBin/></span></Link>}
                <Card.Title tag="h6">{foodType}</Card.Title>                
                <div className="request__card--address">
                    <div><span className="request__card--icon"><ImCalendar/></span>
                    {new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long', year: 'numeric'}).format(new Date(Date.parse(FoodDetail.updatedAt)))}</div>
                    <div >{renderAddress(address)}</div>
                    <div><span className="request__card--icon"><FaUserAlt/></span>
                        <Link to={`/user_profile/${owner}`}>Appealer's Profile</Link>
                    </div>
                </div>
            </Card.Body>
            
            
            <Card.Body>
                {renderFoodDescription(food_description)}
            </Card.Body>
        </Card>
    </FadeTransform>
    <p></p>

    </div>
)}

const renderFoodList = (foodL)=>{
    return foodL.map(food=>{
        return food+', '

    })

}
export const renderOrgCard = function(props){
    const OrgDetail = props.post;
    let {val}= props;
    let {foodType, email, address, contact, name} = OrgDetail
    address = address[0]

    return(
    <div className='request__card' key={val}>
    <FadeTransform in transformProps={{exitTransform: 'scale(0.5) translateY(-50%)'}}>
        <Card>
            <Card.Body>
                <Card.Title tag="h6">{name}</Card.Title>
                    <div className="request__card--address">
                        <div>
                            <b><h6>Deals in:</h6></b>
                            {renderFoodList(foodType)}

                        </div>
                        <div>
                            <span className="request__card--icon"><ImCalendar/></span>
                            <b><span>Registered since: </span></b>
                            {new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'long', year: 'numeric'}).format(new Date(Date.parse(OrgDetail.createdAt)))}
                        </div>
                        <hr/>
                    </div>
                    <div>
                        <div>{renderAddress(address)}</div>
                        <div className="card__content--row">
                            <span className="card__content__heading">
                                <span className="request__card--icon"><AiOutlineMail/></span>
                                Email: &nbsp;
                            </span>
                                {email}
                        </div>

                        <div className="card__content--row">
                            <span className="card__content__heading">
                                <span className="request__card--icon"><FiPhoneCall/></span>
                                Contact: &nbsp;
                            </span>
                                {contact}
                        </div>                       
                        
                    </div>
                
            </Card.Body>
        </Card>
    </FadeTransform>
    <p></p>

    </div>
)}