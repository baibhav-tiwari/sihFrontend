//library imports
import React,{Component} from 'react';
import {connect} from 'react-redux';
import Select from 'react-select'
import {toast, ToastContainer} from 'react-toastify';
import { State, City }  from 'country-state-city';
import {Container, Row, Col} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table'
import {GiMailbox, GiKnifeFork} from 'react-icons/gi';
import {FaAddressCard,FaCity,FaGlobeAmericas,FaMapMarkedAlt} from 'react-icons/fa';
import {BiNotepad} from 'react-icons/bi';

//Manual imports
import FormHeader from'../../header/form__header';
import {foodTypes, foodOptions, countryList} from '../../../variables';
import {addRequest, getUserDetails} from '../../../actions/index';

//css
import 'react-toastify/dist/ReactToastify.css';
import '../forms.css'

class DonateFood extends Component{
    constructor(props){
        super(props);
        this.state = {
            foodtype:"",
            food_description:[],
            foodName:"",
            quantity:"",
            askFood:true,
            askAddress:false,
            addressLine1:"",
            addressLine2:"",
            city:"",
            addressState:"",
            postalCode:"",
            country:"",
            errors:{
                foodtype:"",
                food_description:"",
                foodName:"",
                quantity:"",
                addressLine1:"",
                city:"",
                addressState:"",
                postalCode:"",
                country:""
            }
        }
    }
    componentDidMount = async()=>{
        if(!this.props.userProfile){
           await this.props.getUserDetails();
        }
        this.setInitialAddress();
    }

    notifyFail = (message) => toast.error(message);
    notifySuccess = (message) => toast.success(message);

    // set Initial state
    setInitialAddress = ()=>{
        if(this.props.userProfile){
            let address = this.props.userProfile.address[0]
            let {addressLine1, addressLine2, city, postalCode} = address;
            let country_name = address.country;
            let state_name = address.state;
            let {state_code, country_code} = city;
            let country = {label:country_name, value:country_name, country_code}
            let addressState = {label: state_name, value: state_name, state_code}
            this.setState({
                addressLine1, addressLine2, country, addressState, city, postalCode
            })
            
        }
    }

    // input handlers
    handlefoodTypeChange = foodtype => {
        this.setState({ foodtype, food_description:[] ,foodName:""});
    }

    handlefoodNameChange = foodName => {
        this.setState({ foodName , });
    }

    handleInputChange = event=>{
        const target = event.target;
        const name = target.name;
        this.setState({
          [name]: event.target.value
        });
    }

    handleCountryChange = value=>{
        let states = State.getStatesOfCountry(value.country_code);
        let newStateList = []
        for(var i=0;i<states.length;i++){
            var obj = {label:states[i].name, value:states[i].name, state_code:states[i].isoCode, country_code:states[i].countryCode}
            newStateList.push(obj);   
        }
        this.setState({
            country:value,
            countryCode:value.country_code,
            stateList: newStateList,
            addressState:"",
            city:""
        })
    }

    handleAddressStateChange = value =>{
        let cities = City.getCitiesOfState(value.country_code, value.state_code);
        let newCityList = [];
        for(var i=0;i<cities.length;i++){
            var obj = {label:cities[i].name, value:cities[i].name, state_code:cities[i].stateCode, country_code:cities[i].countryCode}
            newCityList.push(obj);   
        }
        this.setState({
            addressState:value,
            cityList: newCityList,
            city:""
        })
    }

    handleCityChange = value =>{
        this.setState({
            city:value
        })

    }


    // form validation

    validateFoodDescription = (foodName, quantity) =>{
        let foodNameError="", quantityError = "", error;
        if(!foodName){
            foodNameError="Select Food";
            error = true;
        }
        if(!quantity){
            quantityError="This field is required";
            error=true;
        }else if(!/^[1-9][0-9]*$/.test(quantity)){
            quantityError="Quantity must be a valid integer greater than 0";
            error = true;
        }
        this.setState(prevState => ({
            errors:{
                foodName:foodNameError,
                quantity: quantityError
            }
        }))
        return !error;
    }

    formValidation = (foodtype, food_description) =>{
        let foodtypeError="", food_descriptionError = "", error;
        if(!foodtype){
            foodtypeError = "Select a Food Type";
            error = true;            
        }
        
        if(!food_description.length)
        {
            food_descriptionError="You must Add at least one food item"
            error= true;
        }
        
        this.setState(prevState => ({
            errors:{
                foodtype:foodtypeError,
                food_description: food_descriptionError
            }
        }))
        
        return !error;
    }
    addressValidation = data=>{
        const {addressLine1, city, addressState, postalCode, country} = data;
        let addressError="", cityError="", countryError="", postalError="",stateError="", error=false;
        if(!addressLine1.trim()){
            addressError=  "This address field is required";
            error=true;
        }
        if(!city){
            cityError="City is required";
            error=true;
        }
        if(!addressState){
            stateError = "State is required";
            error=true;
        }
        
        if(!country){
            countryError=  "You must choose one country";
            error=true;
        }
        if(!postalCode.trim()){
            postalError = "Postal Code is required";
            error=true;
        }
        this.setState(prevState => ({
            errors:{
                addressLine1:addressError,
                city:cityError,
                addressState:stateError,
                postalCode:postalError,
                country:countryError
            }
        }))
        
        return !error;

    }


    //multipage renderig
    showAddressForm= e =>{
        e.preventDefault();
        const foodtype = this.state.foodtype.value;
        const food_description = this.state.food_description;
        const isValid = this.formValidation(foodtype, food_description);
        if(isValid){
            this.setState({
                askAddress:true,
                askFood:false
            })
        }
    }
    showFoodForm = e=>{
        e.preventDefault();
        this.setState({
            askAddress:false,
            askFood:true
        })
    }

    
    // button handlers

    handleFoodReset = e=>{
        e.preventDefault();
        this.setState({
            foodtype:"",
            food_description:[]
        })
    }


    addFoodDescriptiton = (event)=>{
        event.preventDefault();
        const foodName = this.state.foodName.value;
        const quantity = this.state.quantity;
        const isValid = this.validateFoodDescription(foodName, quantity);
        
        if(isValid){
            const food = {foodName, quantity}
            this.setState({
                food_description:[...this.state.food_description, {food}],
                foodName:"",
                quantity:"",
                errors:{
                    foodName:"",
                    quantity:""
                }
            })
        }

    }

    

    handleSubmit = async(event)=>{
        event.preventDefault();
        const foodtype = this.state.foodtype.value;
        let food_description = this.state.food_description;
        const isValid = this.addressValidation(this.state)
        if(isValid){
            const {addressLine1,addressLine2, city, addressState, postalCode, country} = this.state;
            food_description = food_description.map(food_desc=>food_desc.food)
            let data={
                foodType:foodtype, food_description, requestType:'Donate', 
                address:{
                    addressLine1, addressLine2, 
                    city, state:addressState.value,
                    postalCode, country:country.value 
                }
            }
            await this.props.addRequest(data);
            if(this.props.foodRequest.error){
                this.notifyFail(this.props.foodRequest.error);
            }else if(this.props.foodRequest.message){
                this.notifySuccess(this.props.foodRequest.message);
                this.setState({
                    foodtype:"",
                    food_description:[],
                    foodName:"",
                    quantity:"",
                    askFood:true,
                    askAddress:false,
                })
            }
        }
    }


    //rendering components
    renderSelectedFood=()=>{
        const food_description  =this.state.food_description; 
        if(food_description.length>0)
        {
            const foodList = food_description.map(({food}, index)=><tr key={index}>
                <td>{index+1}</td>
                <td>{food.foodName}</td>
                <td>{food.quantity}</td>
            </tr>)
            return(
                <div>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                            <th>S.No</th>
                            <th>Food Description</th>
                            <th>Quantity (persons)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {foodList}       
                        </tbody>
                        </Table>
                
                </div>
            )
        }
        return;
    }

    renderFoodForm = ()=>{
        let foodDescPlaceHolder = this.state.foodtype?"Select Food":"Select Food Type first"
        return(
            <Form>
                <Form.Group controlId="food__type">
                    <Form.Label><span className="form__icon"><GiKnifeFork/></span><span className="label__important">*</span> Food Type</Form.Label>
                    <div>
                        <Select name="foodtype" options={foodTypes} className="basic-multi-select" value={this.state.foodtype} onChange={this.handlefoodTypeChange} classNamePrefix="select" placeholder="Select food type"/>
                        <div className="invalid__feedback">{this.state.errors.foodtype}</div>
                    </div>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label><span className="form__icon"><BiNotepad/></span><span className="label__important">*</span> Food description</Form.Label>
                    {this.renderSelectedFood()}
                    <Row>
                        <Col sm={5}>
                            <Select multi name="foodName" options={foodOptions[this.state.foodtype.value]} className="basic-multi-select" value={this.state.foodName} onChange={this.handlefoodNameChange} classNamePrefix="Select" placeholder={foodDescPlaceHolder}/>
                            <div className="invalid__feedback">{this.state.errors.foodName}</div>
                        </Col>
                        <Col sm={5}>
                            <input name="quantity" className="form-control" type="text" value={this.state.quantity} placeholder="Quantity (number of persons) " onChange={this.handleInputChange} />
                            <div className="invalid__feedback">{this.state.errors.quantity}</div>
                        </Col>
                        <Col sm={2}>
                            <button className="btn__normal btn-outline-info" onClick={this.addFoodDescriptiton}>Add food</button>
                        </Col>
                    </Row>
                    <div className="invalid__feedback">{this.state.errors.food_description}</div>
                    
                </Form.Group>

                <div className="form__btn">
                    <button className="btn" type="submit" onClick={this.showAddressForm}>
                        Next
                    </button>
                    <button className="reset__form__button" style={{float:'right'}} onClick={this.handleFoodReset}> Reset Selection</button>
                </div>
            </Form>

        )
    }
    
    renderAddressForm = ()=>{
        return(
            <>
                <div className="form__subHeading">
                    <h3>Pickup Address</h3>
                </div>
                <Form>
                    
                    <Form.Group controlId="user__address--1">
                        <Form.Label><span className="form__icon"><FaAddressCard/></span><span className="label__important">*</span> Address Line 1</Form.Label>
                        <input name="addressLine1" className="form-control" type="text" value={this.state.addressLine1} placeholder="Enter address" onChange={this.handleInputChange} />
                        <div className="invalid__feedback">{this.state.errors.addressLine1}</div>
                    </Form.Group>

                    <Form.Group controlId="user__address--2">
                        <Form.Label><span className="form__icon"><FaAddressCard/></span>Address Line 2</Form.Label>
                        <input name="addressLine2" className="form-control" type="text" value={this.state.addressLine2} placeholder="Enter landmark" onChange={this.handleInputChange} />
                    </Form.Group>

                    <Row>
                            <Col md={6}>
                                <Form.Group controlId="user__country">
                                    <Form.Label><span className="form__icon"><FaGlobeAmericas/></span><span className="label__important">*</span> Country</Form.Label>
                                    <Select name="country" options={countryList} className="basic-multi-select" value={this.state.country} onChange={this.handleCountryChange} classNamePrefix="select" placeholder="Select Country"/>
                                    <div className="invalid__feedback">{this.state.errors.country}</div>
                                </Form.Group>        
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="user__state">
                                    <Form.Label><span className="form__icon"><FaMapMarkedAlt/></span><span className="label__important">*</span> State</Form.Label>
                                    <Select name="addressState" options={this.state.stateList} className="basic-multi-select" value={this.state.addressState} onChange={this.handleAddressStateChange} classNamePrefix="select" placeholder="Select State"/>
                                    
                                    <div className="invalid__feedback">{this.state.errors.addressState}</div>
                                </Form.Group>        
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="user__city">
                                    <Form.Label><span className="form__icon"><FaCity/></span><span className="label__important">*</span> City</Form.Label>
                                    <Select name="city" options={this.state.cityList} className="basic-multi-select" value={this.state.city} onChange={this.handleCityChange} classNamePrefix="select" placeholder="Select City"/>
                                    <div className="invalid__feedback">{this.state.errors.city}</div>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="user__zip">
                                    <Form.Label><span className="form__icon"><GiMailbox/></span><span className="label__important">*</span> Postal Code</Form.Label>
                                    <input name="postalCode" className="form-control" type="text" value={this.state.postalCode} placeholder="Enter Postal Code" onChange={this.handleInputChange} />
                                    <div className="invalid__feedback">{this.state.errors.postalCode}</div>
                                </Form.Group>
                            </Col>
                        </Row>
                </Form>
                <div className="invalid__feedback" style={{fontSize:"1.2rem"}}>** Don't forget to delete the request, once it gets fulfilled.</div>
                <div className="form__btn">
                    <button className="form__btn--normal btn--green mr-3" type="submit" onClick={this.handleSubmit}>
                        Submit
                    </button>
                    <button className="form__btn--normal btn--red"  onClick={this.showFoodForm}>
                        Go back
                    </button>
                </div>
            </>
        )
    }

    render(){
        return(
        <div>
            <FormHeader/>
            <ToastContainer/>
            <div className="forms__section--food">
                <Container>
                
                    <div className="form__heading">
                        <h2>Donate Food</h2>
                    </div>
                    {this.state.askFood&& this.renderFoodForm()}
                    {this.state.askAddress&&this.renderAddressForm()}
                </Container>
            </div>
        </div>
        );
    }
}

const mapStateToProps = (state, ownProps)=>{
    return({
        ...ownProps,
        foodRequest: state.foodRequest,
        userProfile: state.userProfile.profile
    })

}

export default connect(mapStateToProps,{addRequest, getUserDetails})(DonateFood);