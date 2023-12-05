import React from 'react'
import CarBC from "../pics/porsche.jpg"
import HomePicData from "../PicData/HomePicData.js"
import {Link} from 'react-router-dom'
import '../index.css'
function Home() {
  return (
    <div className="home-container">
      <div className='car-background'>
        <p className='top-text'>Checkout Your Next Car . . . . Without the Pushy Salesman</p>
        <img src={CarBC}  alt = 'home-porsche'/>
      </div>
      <div className="services-header">
          <p>Options and Specs Without the Hassle</p>
      </div>
      <div className='card-wrapper'>
        {HomePicData.map((item,index) => {
          return Card(item)
        })}
     </div>
      
    </div>
  )
}
function Card(props){
  return(
      <div className='service-card'>
        <div className="card-body">
          <img src={props.image} alt={props.alt} className = 'card-image' />
          <p className='card-title'>{props.title}</p>
          <p className='card-attention-grabber'>{props.Attention}</p>
          <p className='card-description'>{props.description}</p>
          <Link to ={props.route}>
            <button className='card-button'>Learn More</button>
          </Link>
          </div>
      </div>
  )
}
export default Home