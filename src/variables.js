import { Country}  from 'country-state-city';
export const foodTypes = [{value:'Bakery & Dairy',label:'Bakery & Dairy'}, 
    {value:'FoodGrains, Oil & Masala',label:'FoodGrains, Oil & Masala'},
    {value:'Raw Food', label:'Raw Food'}, 
    {value:'Cooked Food', label:'Cooked Food'},
    {value:'Others',label:'Others'}
];

export const foodOptions ={
    "Bakery & Dairy":[
        {value:'Bread', label:'Bread'},
        {value:'Cookies & Rusk', label:'Cookies & Rusk'},
        {value:'Milk', label:'Milk'},
        {value:'Paneer & Tofu', label:'Paneer & Tofu'},
        {value:'Water', label:'Water'},
    ],
    "FoodGrains, Oil & Masala":[
        {value:'Wheat', label:'Wheat'},
        {value:'Rice', label:'Rice'},
        {value:'Pulses', label:'Pulses'},
        {value:'Cooking Oil', label:'Cooking Oil'},
        {value:'Salt', label:'Salt'},
        {value:'Sugar', label:'Sugar'},
        {value:'Spices', label:'Spices'},
    ],
    "Raw Food":[
        {value:'Vegetables', label:'Vegetables'},
        {value:'Fruits', label:'Fruits'},
        {value:'Meat', label:'Meat'},
        {value:'Egg', label:'Egg'},
        {value:'Fish', label:'Fish'}
    ],
    "Cooked Food":[
        {value:'Boiled Rice', label:'Boiled Rice'},
        {value:'Chappati', label:'Chappati'},
        {value:'Cooked Vegetable', label:'Cooked Vegetable'}, 
        {value:'Oats', label:'Oats'}
    ],
    "Others":[
        {value:'Anything Veg', label:'Anything Veg'},
        {value:'Anything Non-Veg', label:'Anything Non-Veg'},
        {value:'Any food', label:'Any food'},
    ]
}

/**/
let countries = Country.getAllCountries();
let newCountryList = []
for(var i=0;i<countries.length;i++){
    var obj = {label:countries[i].name, value:countries[i].name, country_code:countries[i].isoCode}
    newCountryList.push(obj);
}
export const countryList =  newCountryList;