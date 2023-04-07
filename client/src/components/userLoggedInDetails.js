import React, { Component } from 'react';
import './userLoggedInDetails.css'
import {Accordion, AccordionBody, AccordionHeader, AccordionItem} from "react-headless-accordion";


class userLoggedInDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userData: "",
            userProducts: []
        }
        
    }


    componentDidMount(){

        const userDataRequest = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*"
          },
          body: JSON.stringify({
            token: window.localStorage.getItem("token")
          })
        };
        
        const userProductsRequest = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*"
          },
          body: JSON.stringify({
            token: window.localStorage.getItem("token")
          })
        };
        
        Promise.all([
          fetch("http://localhost:8080/userData", userDataRequest),
          fetch("http://localhost:8080/userProducts", userProductsRequest)
        ])
          .then((responses) => {
            const userDataResponse = responses[0].json();
            const userProductsResponse = responses[1].json();
        
            return Promise.all([userDataResponse, userProductsResponse]);
          })
          .then((data) => {
            const userData = data[0].data;
            const userProducts = data[1].data;
        
            console.log(userData, "userData");
            console.log(userProducts, "userProducts");
        
            this.setState({
              userData: userData,
              userProducts: userProducts
            });
          })
          .catch((error) => console.error(error));


    }

            
    render() {

      
      

        return (
            <div className='page-loggedin'>
                {/* <h1 className='loggedin-title'>Welcome</h1>
                <h1 className='fname-logged'> Name : {this.state.userData.fname} </h1>
                <h1 className='femail-logged'> E-MAIL : {this.state.userData.email} </h1> */}

                <img className='goback-icon' src='https://i.imgur.com/BabBHSN.png'></img>

                <h1 className='tracking-de'>Tracking delivery</h1>

                {this.state.userProducts.map((product) => (
                <div className='record-details-products' key={product._id}>

                  <AccordionItem >
                    <h1 className='product-name'>{product.productName} </h1>
                    <h1 className='product-date'>date</h1>
                    <h1 className='delivery-state'>delivery state...</h1>
                    <AccordionHeader className='seemore'>
                      <h1 className='product-viewitem'>view item</h1>
                      <br></br>
                    </AccordionHeader>
                    <AccordionBody>
                      <br></br>
                      <div className='order-delvired'>
                        <img className='circle' src='https://i.imgur.com/vdf7gCq.png'></img>
                        <br></br>
                        <img className='vertical-line' src='https://i.imgur.com/9I7Z57N.png'></img>
                        <h1 className='order-delivred'>Order Delivred</h1>
                        <h1 className='datee'>date</h1>
                      </div>

                      <div className='pickup-order'>
                        <img className='circle' src='https://i.imgur.com/vdf7gCq.png'></img>
                        <br></br>
                        <img className='vertical-line' src='https://i.imgur.com/9I7Z57N.png'></img>
                        <h1 className='order-delivred'>Pickup Order</h1>
                        <h1 className='datee'>date</h1>
                      </div>

                      <div className='order-accepted'>
                        <img className='circle' src='https://i.imgur.com/vdf7gCq.png'></img>
                        <br></br>
                        <img className='vertical-line' src='https://i.imgur.com/9I7Z57N.png'></img>
                        <h1 className='order-delivred'>Order accepted</h1>
                        <h1 className='datee'>date</h1>
                      </div>

                      <div className='order-placed'>
                        <img className='circle' src='https://i.imgur.com/vdf7gCq.png'></img>
                        <br></br>
                        <img className='vertical-line' src='https://i.imgur.com/9I7Z57N.png'></img>
                        <h1 className='order-delivred'>Order accepted</h1>
                        <h1 className='datee'>date</h1>
                      </div>

                    </AccordionBody>
                  </AccordionItem>

                </div>
                ))}
            </div>
        );
  }
}

export default userLoggedInDetails;