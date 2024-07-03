import React from 'react'
import NavBar from '../HomePage/NavBar/NavBar'
import Back from '../Back/Back'
import Aboutbody from '../HomePage/About/About';
import Footer from '../HomePage/Footer/Footer';
import './About.css';
import  TabsCustomAnimation  from './Tabs';
const About = () => {
  return (
    <>
      <NavBar/>
    <Back title={" هنا من نحن"}/>
    <div className="about-body-container">
        <Aboutbody />
      </div>
    <TabsCustomAnimation/>
    <Footer/>
   
 
    </>
  )
}

export default About
