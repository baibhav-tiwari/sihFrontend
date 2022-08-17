// library imports
import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Container, Row, Col,Form} from 'react-bootstrap';
import {toast, ToastContainer} from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';
import Select from 'react-select';
import { State, City }  from 'country-state-city';
import {FaCity, FaMapMarkedAlt} from 'react-icons/fa';
import {GiKnifeFork, GiMailbox} from 'react-icons/gi';

//manual imports
import FormHeader from'../header/form__header';
import {renderCard} from './request_cards.js'
import {foodTypes} from '../../variables';
import Loader from '../loader';
//api endpoints
import {fetchRequests, deleteFoodRequest, getUserDetails} from '../../actions/index'

//css
import './pickup.css';



class NeedRequest extends Component {
    constructor(props){
        super(props);
        this.state = {
            foodtype:"",
            userCity:"",
            userState:"",
            foodTypeFilter:"",
            cityList:[],
            stateList:[],
            city:"",
            addressState:"",
            country:"",
            postalCode:"",
            limit:12,
            requestType:"Need",
            formError:"",
            hasMore: true,
            data:[]
        }
    }

    componentDidMount = async()=>{
        if(this.props.auth.isSignedIn){
            await this.getUserData();
        }
        await this.fetchData();
    }

    notifyFail = (message) => toast.error(message);
    notifySuccess = (message) => toast.success(message);

    //API calling
    getUserData = async()=>{
        await this.props.getUserDetails();
        if(this.props.userProfile.profile){
            let address = this.props.userProfile.profile.address[0]
            this.setState({
                userCity: address.city
            }, ()=>{this.setStateList(this.state.userCity)})
        }
    }

    fetchData = async()=>{
        if(!this.state.hasMore) return;
        let { data, limit, requestType, city, state, country, postalCode}= this.state;
        const skip = data.length;
        let apiData = {Limit:limit, Skip:skip, requestType, city, state, country, postalCode}
        await this.props.fetchRequests(apiData);
        if(this.props.food_Requests.message==="Success"){
            let newData = this.props.food_Requests.data.foodRequest;
            if(newData&& newData.length>0){
                var hasMoreNew;
                if(newData.length<limit){
                    hasMoreNew = false;
                }else{
                    hasMoreNew = true;
                }
                const resData = data.concat(newData)
                this.setState({
                    hasMore: hasMoreNew,
                    data: resData
                })
            }else{
                this.setState({hasMore:false})
            }
        }
    }

    deleteFoodPost = async(id)=>{
        await this.props.deleteFoodRequest({id})
        if(this.props.foodRequestConfirmation.error){
            this.notifyFail(this.props.foodRequestConfirmation.error);
        }else if(this.props.foodRequestConfirmation.message){
            this.notifySuccess(this.props.foodRequestConfirmation.message);
            let data = this.state.data
            let newData = [];
            for(var i=0;i<data.length;i++){
                if(data[i]._id !== id){
                    newData.push(data[i]);
                }
            }
            this.setState({
                data: newData,
            }, this.fetchData)
        }
    }
    

    //Form Input handlers

    handlefoodTypeChange = foodtype => {
        this.setState({ foodTypeFilter: foodtype });
    }

    handleInputChange = (event)=>{
        const target = event.target;
        const name = target.name;
        this.setState({
          [name]: event.target.value
        });
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
            city:value,
            data:[],
            hasMore:true
        }, this.fetchData)

    }

    setStateList = value=>{
        //value contains city of the user.
        let states = State.getStatesOfCountry(value.country_code);
        let newStateList = []
        for(var i=0;i<states.length;i++){
            var obj = {label:states[i].name, value:states[i].name, state_code:states[i].isoCode, country_code:states[i].countryCode}
            newStateList.push(obj);   
        }
        this.setState({
            stateList: newStateList,
            addressState:"",
            city:""
        })
    }

    resetFilterButton = (e) =>{
        e.preventDefault();
        this.setState({
            foodTypeFilter:"",
            postalCode:"",
            city:"",
            addressState:"",
            hasMore:true
        }, this.fetchData)
    }


    //rendering
    
    renderRequests = ()=>{
        let posts = this.state.data;
        if(this.state.postalCode || this.state.foodTypeFilter){
            posts = posts.filter((post) => {
                return(
                    ((this.state.foodTypeFilter&&post.foodType.includes(this.state.foodTypeFilter.value))||(this.state.postalCode&&post.address[0].postalCode.startsWith(this.state.postalCode)))
                )
            });
        }
        if(posts&&posts.length>0){
            return posts.map((post,  key)=>{
                return renderCard({post,val:key, authId:this.props.auth.userId, deleteFoodRequest: (id)=>this.deleteFoodPost(id)})
            })
        }else if(!this.state.hasMore){
            return(
                <h3>No request exist at your location</h3>
            )
        }else return;
        
    }

    render() {        
        return (
            <div>
                <FormHeader/>
                <ToastContainer/>
                <div className="forms__section--food">
                    <Container>    
                        <div className="form__heading">
                            <h2>Need Food Requests</h2>
                        </div>
                        <div className="search__section">
                            <h3 className="filters__heading"> Filter results</h3>

                            <Form.Group as={Row} controlId="food__type">
                                <Col md={6}>
                                <Form.Group controlId="food__type">
                                    <Form.Label><span className="form__icon"><GiKnifeFork/></span>Food Type</Form.Label>
                                    <div>
                                        <Select name="foodtype" options={foodTypes} className="basic-multi-select" value={this.state.foodTypeFilter} onChange={this.handlefoodTypeChange} classNamePrefix="select" placeholder="Select food type"/>
                                    </div>
                                </Form.Group>
                                </Col>
                                
                                <Col md={6}>
                                    <Form.Group controlId="user__zip">
                                    <Form.Label><span className="form__icon"><GiMailbox/></span><span className="label__important">*</span> Postal Code</Form.Label>
                                    <input name="postalCode" className="form-control" type="text" value={this.state.postalCode} placeholder="Enter Postal Code" onChange={this.handleInputChange} />
                                </Form.Group>
                                </Col>

                                <Col md={6}>
                                <Form.Group controlId="user__state">
                                    <Form.Label><span className="form__icon"><FaMapMarkedAlt/></span><span className="label__important">**</span> State</Form.Label>
                                    <Select name="addressState" options={this.state.stateList} className="basic-multi-select" value={this.state.addressState} onChange={this.handleAddressStateChange} classNamePrefix="select" placeholder="Select State"/>
                                </Form.Group>        
                                </Col>

                                <Col md={6}>
                                <Form.Group controlId="user__city">
                                    <Form.Label><span className="form__icon"><FaCity/></span><span className="label__important">**</span> City</Form.Label>
                                    <Select name="city" options={this.state.cityList} className="basic-multi-select" value={this.state.city} onChange={this.handleCityChange} classNamePrefix="select" placeholder="Select City"/>
                                </Form.Group>
                                </Col>
                            </Form.Group>
                    
                            <div style={{textAlign:'right'}}>   
                                <button className="filter__button reset_filter_btn"  onClick={this.resetFilterButton}>Reset Filter</button>   
                            </div> 
                            <div className="invalid__feedback">** To apply State or City filter both 'State' and 'City' fields must be filled</div>   
                        </div>


                        <div className="requests__content">
                            <InfiniteScroll 
                                dataLength={this.state.data.length}
                                next = {this.fetchData}
                                hasMore = {this.state.hasMore}
                                loader={<Loader/>}
                                endMessage={<></>}
                                className="flex flex-wrap scroll_div_outer"
                            >
                                {this.renderRequests()}
                            </InfiniteScroll>
                        </div>
                        
                    </Container>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps)=>{
    return({
        ...ownProps,
        food_Requests: state.needRequests,
        auth:state.auth,
        foodRequestConfirmation: state.foodRequest,
        userProfile: state.userProfile 
    })

}

export default connect(mapStateToProps,{fetchRequests, deleteFoodRequest, getUserDetails})(NeedRequest);